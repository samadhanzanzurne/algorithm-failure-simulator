class ComparisonModule:
    @staticmethod
    def compare(greedy_val, dp_val, problem_type="zero_one"):
        # For coin change, lower is better (minimum coins)
        if problem_type == "coin_change":
            is_optimal = greedy_val == dp_val
            # If dp_val is inf, target is impossible.
            if dp_val == float('inf'):
                is_optimal = True # Both technically optimal in failing
            diff = greedy_val - dp_val if not is_optimal else 0
            return {
                "greedy_value": greedy_val if greedy_val != float('inf') else -1,
                "dp_value": dp_val if dp_val != float('inf') else -1,
                "difference": diff,
                "is_optimal": is_optimal
            }
        else:
            # Knapsack problems where higher is better
            return {
                "greedy_value": greedy_val,
                "dp_value": dp_val,
                "difference": dp_val - greedy_val,
                "is_optimal": greedy_val == dp_val
            }


class ExplanationEngine:
    @staticmethod
    def generate_explanation(greedy_items, dp_items, comparison_result, inputs, problem_type="zero_one"):
        if comparison_result["is_optimal"]:
            if problem_type == "fractional":
                return "The Greedy approach perfectly matches DP. The Fractional Knapsack natively possesses the Greedy Choice Property, meaning sorting by ratio always yields strict mathematical optimality without complex overhead."
            elif problem_type == "coin_change":
                return "The Greedy approach succeeded! The provided coin denominations likely form a 'Canonical Coin System' (like standard US currency), where Greedy is guaranteed to find the minimum coins natively."
            else:
                return "The Greedy approach successfully found the optimal solution for this configuration. This is circumstantial; Greedy usually fails 0/1 Knapsack setups."
        
        diff = comparison_result["difference"]
        
        if problem_type == "coin_change":
            return (
                f"The Greedy algorithm failed by using {diff} MORE coin(s) than the dynamic matrix.\n\n"
                "Reasoning:\n"
                "You provided a 'Non-Canonical' coin system. The greedy heuristic aggressively takes the largest available coin, "
                "which traps it. By taking a massive coin early, it leaves a problematic remainder that requires many small 1-unit coins to fill, "
                "ignoring cleaner combinations of medium coins. DP avoids this by calculating the absolute minimums bottom-up."
            )
        else:
            return (
                f"The Greedy approach failed to find the optimal solution by a mathematical margin of {diff} value points.\n\n"
                "Reasoning:\n"
                "The algorithm prioritizes highest value-to-weight ratio locally without looking ahead. Because items in the 0/1 Knapsack "
                "cannot be fractioned, taking an excellent ratio might block combinations that yield a higher combined volume value. "
                "The DP engine looked globally utilizing previous array states (Optimal Substructure)."
            )
