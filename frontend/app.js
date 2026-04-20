document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('simulator-form');
    const errorMsg = document.getElementById('error-message');
    const resultsPanel = document.getElementById('results-panel');
    const simulateBtn = document.getElementById('simulate-btn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset UI
        errorMsg.classList.add('hidden');
        resultsPanel.classList.add('hidden');
        
        const weightsStr = document.getElementById('weights').value;
        const valuesStr = document.getElementById('values').value;
        const capacityStr = document.getElementById('capacity').value;

        try {
            // Data Parsing and Initial Validation
            const weights = weightsStr.split(',').map(item => parseInt(item.trim(), 10));
            const values = valuesStr.split(',').map(item => parseInt(item.trim(), 10));
            const capacity = parseInt(capacityStr.trim(), 10);

            if (weights.some(isNaN) || values.some(isNaN) || isNaN(capacity)) {
                throw new Error("Invalid Input: Data must be numbers. Ensure lists are comma-separated.");
            }
            if (weights.length === 0 || values.length === 0) {
                throw new Error("Invalid Input: Arrays cannot be empty.");
            }
            if (weights.length !== values.length) {
                throw new Error(`Size Mismatch: Weights length (${weights.length}) does not match Values length (${values.length}).`);
            }

            // Update UI State for Loading
            simulateBtn.textContent = 'Running Analysis...';
            simulateBtn.disabled = true;

            // Fetch Strategy from Backend
            const response = await fetch('/api/simulate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    weights: weights,
                    values: values,
                    capacity: capacity
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "A server error occurred during traversal.");
            }

            // Populate Engine Result Data
            document.getElementById('greedy-value').textContent = data.results.greedy.total_value;
            // Format array properly to look clean mathematically
            document.getElementById('greedy-items').textContent = `[${data.results.greedy.selected_items.join(', ')}]`;

            document.getElementById('dp-value').textContent = data.results.dp_optimal.total_value;
            document.getElementById('dp-items').textContent = `[${data.results.dp_optimal.selected_items.join(', ')}]`;

            // Display generated Explanation string exactly as provided by the backend text diagnostics.
            document.getElementById('explanation-text').textContent = data.explanation;

            // Reveal Result Container
            resultsPanel.classList.remove('hidden');

        } catch (err) {
            errorMsg.textContent = err.message;
            errorMsg.classList.remove('hidden');
        } finally {
            // Restore UI State
            simulateBtn.textContent = 'Run Engine Implementation';
            simulateBtn.disabled = false;
        }
    });
});
