# Algorithm Failure Simulator: Enterprise Heuristics & Diagnostics Dashboard

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

## 1. Project Overview

The **Algorithm Failure Simulator** is an interactive, enterprise-grade diagnostic dashboard designed to demonstrate the mechanical differences between heuristic approximations (**Greedy Algorithms**) and exhaustive optimal strategies (**Dynamic Programming**). 

As computational complexity scales natively in software development, engineers often default to Greedy approaches to handle continuous arrays. This application acts as a direct validation suite, providing mathematical visual proof that while greedy algorithms possess massive architectural speed advantages ($O(n \log n)$), their failure to respect *Optimal Substructure* in specific environments actively traps them into returning significantly sub-optimal solutions.

---

## 2. Core Features

### 🧩 Tri-State Problem Engines
The simulator natively evaluates heuristic mapping across three rigid computational constraints:
* **0/1 Knapsack Problem:** Demonstrates catastrophic Greedy failure. Because discrete items cannot be fractioned, taking an item with the highest local ratio locks out combinations yielding absolute optimal capacities.
* **Fractional Knapsack Problem:** Validates Greedy success. Demonstrates an environment possessing the *Greedy Choice Property*, proving that continuous fractions allow sorting algorithms to execute flawlessly without recursive DP matrices.
* **Coin Change Problem:** Evaluates environmental parameters. Illustrates how Greedy effectively solves *Canonical* coin sets (like US Currency), but mathematically stalls when encountering *Non-Canonical* system variables, proving heuristic fragility.

### ⏱️ CPU Benchmarking & Stress Testing
Designed with a rigorous telemetry suite, the dashboard calculates script execution natively on the host thread. Utilizing randomized dataset injection up to $n=5000$, it evaluates memory complexity, graphing the extreme **Time vs. Accuracy trade-off** dynamically so analysts can chart when $O(nW)$ dynamic tables become unsafe in production loads.

---

## 3. Tech Stack

**Frontend Layer:**
* **Framework:** React.js bootstrapped with Vite for instant Hot-Module-Replacement.
* **Aesthetics:** Tailwind CSS v4 featuring deeply customized Slate/Indigo Dark UI layouts enforcing enterprise data readability.
* **Charting Engine:** Recharts (SVG-based reactive graphs for execution telemetry).

**Backend Engine:**
* **API Server:** Python via Flask (utilizing `flask-cors` for cross-origin tunneling).
* **Matrix Logic:** Custom algorithmic encapsulation spanning 6 localized state-tracking engines.
* **Clock Operations:** Natively utilizing `time.perf_counter_ns()` to strip network transport lag and measure precise millisecond pipeline performance.

---

## 4. Installation & Setup Instructions

To launch the simulator locally, follow these steps to initialize both application bounds.

### Backend Setup (Python API)
1. Open your terminal and navigate to the absolute root directory of the project.
2. Formulate an isolated Python virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the environment (Command varies by OS):
   - **Windows:** `venv\Scripts\activate`
   - **Mac/Linux:** `source venv/bin/activate`
4. Install exactly mapped requirements:
   ```bash
   pip install -r requirements.txt
   ```
5. Ignite the Flask engine:
   ```bash
   python server.py
   ```

### Frontend Setup (React SPA)
1. Open a *secondary* terminal window and navigate to the frontend sub-folder:
   ```bash
   cd dashboard
   ```
2. Download node dependencies:
   ```bash
   npm install
   ```
3. Boot the Vite development server:
   ```bash
   npm run dev
   ```
*The Pro Dashboard will render automatically at natively cached port `http://localhost:5173/`.*

---

## 5. Usage Guide

1. Navigate to the local Vite web interface. 
2. **Select Navigation Tab:** Use the main header to swap between *0/1 Knapsack*, *Fractional*, or *Coin Change* contexts.
3. **Parameter Input:** Using the control panel, pass comma-separated integer variables (e.g. `10, 20, 30` or `1, 3, 4`). Avoid decimal injections.
4. **Trigger Evaluation:** Select `Run Custom Simulation` to asynchronously fire payloads back to the Python instance. The visualizer will construct the mapping tracks and DP grids dynamically based on the returned multi-state matrix schemas. 

---

## 6. Algorithmic Benchmarking Diagnostics

To accurately plot execution differences safely isolated from internet or local-bus latency, the system performs telemetry capturing at the absolute core logic boundaries on the Python execution stack.

```python
import time

def execute_engine_telemetry(weights, values, capacity):
    # Capture start cycle in nanoseconds to mitigate float rounding error
    start_greedy = time.perf_counter_ns()
    
    # Process Heuristic Evaluation Array
    greedy_items, greedy_val, greedy_state = GreedyClass.solve(weights, values, capacity)
    
    # Capture Delta Phase
    end_greedy = time.perf_counter_ns()
    
    # Convert natively into precise milliseconds
    greedy_ms = (end_greedy - start_greedy) / 1_000_000.0
    
    return greedy_ms
```
