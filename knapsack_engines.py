"""
Algorithm Failure Simulator - Knapsack Engines

This module provides two different approaches to solving the 0/1 Knapsack Problem:
1. A Greedy approach (often fails to find the optimal solution for 0/1 Knapsack).
2. A Dynamic Programming approach (guarantees the optimal solution).
"""

class GreedyEngine:
    """
    Implements a greedy approach to the 0/1 Knapsack problem.
    It selects items based on the highest value-to-weight ratio.
    Note: This is optimal for the Fractional Knapsack problem but may 
    fail to find the optimal solution for the 0/1 Knapsack problem.
    """
    
    @staticmethod
    def solve(weights: list[int], values: list[int], capacity: int) -> tuple[list[int], int]:
        """
        Solves the 0/1 knapsack problem using a greedy strategy.
        
        Args:
            weights (list[int]): A list of integer weights of the items.
            values (list[int]): A list of integer values of the items.
            capacity (int): The maximum weight capacity of the knapsack.
            
        Returns:
            tuple[list[int], int]: A tuple containing:
                - A list of the selected item indices (0-indexed).
                - The total value of the selected items.
        """
        n = len(weights)
        if n == 0 or capacity <= 0:
            return [], 0
            
        # Create a list of items with their original index, value, weight, and ratio
        items = []
        for i in range(n):
            # To avoid division by zero, handle 0 weight items gracefully if any exist
            ratio = values[i] / weights[i] if weights[i] > 0 else float('inf')
            items.append({
                'index': i,
                'weight': weights[i],
                'value': values[i],
                'ratio': ratio
            })
            
        # Sort items primarily by value-to-weight ratio in descending order
        items.sort(key=lambda x: x['ratio'], reverse=True)
        
        selected_indices = []
        total_value = 0
        current_weight = 0
        
        for item in items:
            if current_weight + item['weight'] <= capacity:
                selected_indices.append(item['index'])
                total_value += item['value']
                current_weight += item['weight']
                
        # Sort indices to return them in ascending order
        selected_indices.sort()
        return selected_indices, total_value


class DPOptimalEngine:
    """
    Implements a Dynamic Programming approach to the 0/1 Knapsack problem.
    It uses a 2D table to build up the optimal solution, guaranteeing
    the maximum possible value without exceeding capacity.
    """
    
    @staticmethod
    def solve(weights: list[int], values: list[int], capacity: int) -> tuple[list[int], int]:
        """
        Solves the 0/1 knapsack problem using dynamic programming.
        
        Args:
            weights (list[int]): A list of integer weights of the items.
            values (list[int]): A list of integer values of the items.
            capacity (int): The maximum weight capacity of the knapsack.
            
        Returns:
            tuple[list[int], int]: A tuple containing:
                - A list of the selected item indices (0-indexed).
                - The total value of the selected items.
        """
        n = len(weights)
        if n == 0 or capacity <= 0:
            return [], 0
            
        # Initialize a DP table with zeros
        # dp[i][w] represents the max value achievable with first i items and weight limit w
        dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]
        
        # Build the DP table in bottom-up manner
        for i in range(1, n + 1):
            for w in range(1, capacity + 1):
                # If current item's weight is less than or equal to current capacity
                if weights[i - 1] <= w:
                    # Choose the max of including the item or not including it
                    include_item = values[i - 1] + dp[i - 1][w - weights[i - 1]]
                    exclude_item = dp[i - 1][w]
                    dp[i][w] = max(include_item, exclude_item)
                else:
                    # Current item's weight exceeds capacity, cannot include it
                    dp[i][w] = dp[i - 1][w]
                    
        # Total optimal value is at the bottom right of the table
        optimal_value = dp[n][capacity]
        
        # Backtrack to find which items were selected
        selected_indices = []
        w = capacity
        # Start from the last item and go backwards
        for i in range(n, 0, -1):
            if dp[i][w] <= 0:
                break
            # If the value comes from not including the item, skip it
            if dp[i][w] == dp[i - 1][w]:
                continue
            else:
                # The item must have been included
                selected_indices.append(i - 1)  # -1 because items are 0-indexed
                w -= weights[i - 1]
                
        # Sort indices to return them in ascending order
        selected_indices.sort()
        return selected_indices, optimal_value
