import copy

class ZeroOneKnapsackGreedy:
    @staticmethod
    def solve(weights, values, capacity):
        n = len(weights)
        if n == 0 or capacity <= 0: return [], 0, []
        
        items = [{'index': i, 'weight': weights[i], 'value': values[i], 'ratio': values[i]/weights[i] if weights[i] > 0 else float('inf')} for i in range(n)]
        
        steps = ["Calculated Value-to-Weight ratios for all items."]
        
        items.sort(key=lambda x: x['ratio'], reverse=True)
        steps.append(f"Sorted items logically descending by ratio: {[x['index'] for x in items]}")
        
        selected_indices = []
        total_value = 0
        current_weight = 0
        
        for item in items:
            if current_weight + item['weight'] <= capacity:
                selected_indices.append(item['index'])
                total_value += item['value']
                current_weight += item['weight']
                steps.append(f"Included full item {item['index']} (Value: {item['value']}, Weight: {item['weight']}). Remaining Capacity: {capacity - current_weight}")
            else:
                steps.append(f"Skipped item {item['index']} (Weight: {item['weight']} exceeds Remaining Capacity: {capacity - current_weight}).")
                
        selected_indices.sort()
        return selected_indices, total_value, steps

class ZeroOneKnapsackDP:
    @staticmethod
    def solve(weights, values, capacity):
        n = len(weights)
        if n == 0 or capacity <= 0: return [], 0, []
        
        dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]
        
        for i in range(1, n + 1):
            for w in range(1, capacity + 1):
                if weights[i - 1] <= w:
                    dp[i][w] = max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w])
                else:
                    dp[i][w] = dp[i - 1][w]
                    
        optimal_value = dp[n][capacity]
        
        selected_indices = []
        w = capacity
        for i in range(n, 0, -1):
            if dp[i][w] <= 0: break
            if dp[i][w] != dp[i - 1][w]:
                selected_indices.append(i - 1)
                w -= weights[i - 1]
                
        selected_indices.sort()
        return selected_indices, optimal_value, dp

class FractionalKnapsackGreedy:
    @staticmethod
    def solve(weights, values, capacity):
        n = len(weights)
        if n == 0 or capacity <= 0: return [], 0.0, []
        
        items = [{'index': i, 'weight': weights[i], 'value': values[i], 'ratio': values[i]/weights[i] if weights[i] > 0 else float('inf')} for i in range(n)]
        steps = ["Calculated Value-to-Weight ratios for all items."]
        
        items.sort(key=lambda x: x['ratio'], reverse=True)
        steps.append(f"Sorted items by ratio descending.")
        
        selected_indices = []
        total_value = 0.0
        current_weight = 0
        
        for item in items:
            if current_weight + item['weight'] <= capacity:
                selected_indices.append(item['index'])
                total_value += item['value']
                current_weight += item['weight']
                steps.append(f"Included full item {item['index']} (Value: {item['value']}). Remaining: {capacity - current_weight}")
            else:
                remain = capacity - current_weight
                if remain > 0:
                    fraction = remain / item['weight']
                    selected_indices.append(item['index'])
                    total_value += item['value'] * fraction
                    steps.append(f"Included {fraction:.2f} of item {item['index']} (Fractional Value: {item['value'] * fraction:.2f}). Remaining: 0")
                    current_weight += remain
                break
                
        return sorted(selected_indices), round(total_value, 2), steps

class FractionalKnapsackDP:
    @staticmethod
    def solve(weights, values, capacity):
        """
        Fractional Knapsack has the Greedy Choice Property. DP is mathematically
        equivelant to Greedy for continuous variables, avoiding $O(nW)$ loops.
        """
        return FractionalKnapsackGreedy.solve(weights, values, capacity)

class CoinChangeGreedy:
    @staticmethod
    def solve(coins, _, target):
        steps = ["Sorted coins progressively descending."]
        coins_sorted = sorted(coins, reverse=True)
        
        selected_coins = []
        current_sum = 0
        num_coins = 0
        
        for c in coins_sorted:
            while current_sum + c <= target:
                selected_coins.append(c)
                current_sum += c
                num_coins += 1
                steps.append(f"Added coin {c}. Remaining target: {target - current_sum}")
                
        if current_sum != target:
            steps.append("Greedy approach failed to reach the exact target sum.")
            # Set to infinity to denote failure to formulate target
            num_coins = float('inf')
        else:
            steps.append("Greedy approach finished forming target sum.")
            
        return selected_coins, num_coins, steps

class CoinChangeDP:
    @staticmethod
    def solve(coins, _, target):
        # target becomes 'capacity' visually
        if target <= 0: return [], 0, []
        
        dp = [float('inf')] * (target + 1)
        dp[0] = 0
        coin_used = [-1] * (target + 1)
        
        for i in range(1, target + 1):
            for j, c in enumerate(coins):
                if i - c >= 0 and dp[i - c] + 1 < dp[i]:
                    dp[i] = dp[i - c] + 1
                    coin_used[i] = j # index of the coin
                    
        # the DP state history array
        state = copy.deepcopy(dp)
        # convert inf to -1 for easier JSON serialization
        state = [-1 if x == float('inf') else x for x in state]
        
        if dp[target] == float('inf'):
            return [], float('inf'), state
            
        selected_coins = []
        curr = target
        while curr > 0:
            c_idx = coin_used[curr]
            c = coins[c_idx]
            selected_coins.append(c)
            curr -= c
            
        return selected_coins, dp[target], state
