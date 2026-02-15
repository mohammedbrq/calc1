document.addEventListener('DOMContentLoaded', () => {
    const incomeInput = document.getElementById('income');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultContainer = document.getElementById('result-container');
    const taxAmountDisplay = document.getElementById('tax-amount');
    const breakdownDisplay = document.getElementById('breakdown');

    // Allow Enter key to trigger calculation
    incomeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculateBtn.click();
        }
    });

    calculateBtn.addEventListener('click', () => {
        const income = parseFloat(incomeInput.value);

        if (isNaN(income) || income < 0) {
            alert('Please enter a valid positive income amount');
            return;
        }

        const tax = calculateTax(income);
        displayResult(tax);
    });

    function calculateTax(x) {
        if (x === 0) return 0;

        let totalTax = 0;
        let remainingIncome = x;
        let currentRate = 0.05;

        // Progressive tax: 5% increases every 5000, capped at 25% for >20000
        while (remainingIncome > 0) {
            let taxableChunk;

            if (remainingIncome >= 5000) {
                taxableChunk = 5000;
            } else {
                taxableChunk = remainingIncome;
            }

            const bracketTax = taxableChunk * currentRate;
            totalTax += bracketTax;

            remainingIncome -= taxableChunk;

            // Tax rate increases by 5% each bracket, but stops increasing at 25%
            if (currentRate < 0.25) {
                currentRate += 0.05;
            }
        }

        return totalTax;
    }

    function displayResult(amount) {
        // Format as currency
        const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);

        taxAmountDisplay.textContent = formatted;

        // Add random breakdown text for flavor or calculate real rate
        const effectiveRate = (amount / parseFloat(incomeInput.value)) * 100;
        if (!isNaN(effectiveRate) && effectiveRate > 0) {
            breakdownDisplay.textContent = `Effective Tax Rate: ${effectiveRate.toFixed(2)}%`;
        } else {
            breakdownDisplay.textContent = '';
        }

        resultContainer.classList.add('show');
    }
});
