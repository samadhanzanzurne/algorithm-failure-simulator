from flask import Flask, request, jsonify
from engines import ZeroOneKnapsackGreedy, ZeroOneKnapsackDP, FractionalKnapsackGreedy, FractionalKnapsackDP, CoinChangeGreedy, CoinChangeDP
from analysis import ComparisonModule, ExplanationEngine
from flask_cors import CORS
import os
import random

app = Flask(__name__)
application = app # Standard WSGI target
CORS(app)

@app.route('/')
def health_check():
    return jsonify({"status": "Algorithm Failure Simulator Backend is Live!"}), 200

ENGINE_MAP = {
    "zero_one": (ZeroOneKnapsackGreedy, ZeroOneKnapsackDP),
    "fractional": (FractionalKnapsackGreedy, FractionalKnapsackDP),
    "coin_change": (CoinChangeGreedy, CoinChangeDP)
}

@app.route('/api/simulate', methods=['POST'])
def simulate():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON payload provided."}), 400
        
    problem_type = data.get('problem_type', 'zero_one')
    
    if problem_type not in ENGINE_MAP:
        return jsonify({"error": "Invalid problem_type."}), 400
        
    GreedyClass, DPClass = ENGINE_MAP[problem_type]
    
    weights = data.get('weights', [])
    values = data.get('values', [])
    
    # Unified variable handling for coin change vs knapsack
    if problem_type == 'coin_change':
        capacity = data.get('capacity', data.get('target', 0))
        weights = data.get('weights', data.get('coins', []))
    else:
        capacity = data.get('capacity', 0)
        
    if not capacity:
        return jsonify({"error": "Missing capacity."}), 400

    # Execute Greedy
    start_greedy = time.perf_counter_ns()
    greedy_items, greedy_val, greedy_state = GreedyClass.solve(weights, values, capacity)
    end_greedy = time.perf_counter_ns()

    # Execute DP
    start_dp = time.perf_counter_ns()
    dp_items, dp_val, dp_state = DPClass.solve(weights, values, capacity)
    end_dp = time.perf_counter_ns()
    
    comp_result = ComparisonModule.compare(greedy_val, dp_val, problem_type)
    explanation = ExplanationEngine.generate_explanation(
        greedy_items, dp_items, comp_result, weights, problem_type
    )
    
    return jsonify({
        "status": "success",
        "problem_type": problem_type,
        "input": {"weights": weights, "values": values, "capacity": capacity},
        "results": {
            "greedy": {
                "selected_items": greedy_items,
                "total_val_or_coins": greedy_val,
                "execution_time_ns": end_greedy - start_greedy,
                "state_tracking": greedy_state
            },
            "dp_optimal": {
                "selected_items": dp_items,
                "total_val_or_coins": dp_val,
                "execution_time_ns": end_dp - start_dp,
                "state_tracking_matrix": dp_state
            }
        },
        "comparison": comp_result,
        "explanation": explanation
    }), 200

@app.route('/api/stress-test', methods=['POST'])
def stress_test():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON payload provided."}), 400
        
    problem_type = data.get('problem_type', 'zero_one')
    size = data.get('dataset_size', 100)
    
    if problem_type not in ENGINE_MAP:
        return jsonify({"error": "Invalid problem_type."}), 400
        
    if size > 5000:
        return jsonify({"error": "Dataset size capped at 5000 to prevent timeout."}), 400

    # Generate deterministic random data bounds
    random.seed(42 + size)
    
    if problem_type == 'coin_change':
        coins = [1] + random.sample(range(2, 200), min(size, 198))
        weights = coins
        values = []
        capacity = size * 5
    else:
        weights = [random.randint(5, 100) for _ in range(size)]
        values = [random.randint(10, 200) for _ in range(size)]
        capacity = int(sum(weights) * 0.5)
        
    GreedyClass, DPClass = ENGINE_MAP[problem_type]
    
    start_greedy = time.perf_counter_ns()
    greedy_items, greedy_val, _ = GreedyClass.solve(weights, values, capacity)
    end_greedy = time.perf_counter_ns()

    start_dp = time.perf_counter_ns()
    dp_items, dp_val, _ = DPClass.solve(weights, values, capacity)
    end_dp = time.perf_counter_ns()

    greedy_ms = (end_greedy - start_greedy) / 1_000_000.0
    dp_ms = (end_dp - start_dp) / 1_000_000.0

    return jsonify({
        "status": "success",
        "benchmark": "stress",
        "problem_type": problem_type,
        "dataset_size": size,
        "timing_metrics": {
            "greedy_time_ms": round(greedy_ms, 4),
            "dp_time_ms": round(dp_ms, 4),
            "fastest": "greedy" if greedy_ms < dp_ms else "dp_optimal",
            "difference_ms": round(abs(greedy_ms - dp_ms), 4)
        },
        "results": {
            "greedy_val": greedy_val,
            "dp_val": dp_val
        }
    }), 200

if __name__ == '__main__':
    print("Starting Algorithm Failure Simulator Backend (Phase 1 Refactored)...")
    app.run(debug=True, host='127.0.0.1', port=5000)
