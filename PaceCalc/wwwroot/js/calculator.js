// In-memory storage for calculation results (not using localStorage or cookies)
let calculationHistory = [];

window.calculatorStorage = {
    // Add a new calculation result to history (keep only last 5)
    addResult: function (result) {
        calculationHistory.unshift(result);

        // Keep only the last 5 results
        if (calculationHistory.length > 5) {
            calculationHistory = calculationHistory.slice(0, 5);
        }

        return calculationHistory;
    },

    // Get all stored results
    getResults: function () {
        return calculationHistory;
    },

    // Clear all results
    clearResults: function () {
        calculationHistory = [];
        return calculationHistory;
    }
};
