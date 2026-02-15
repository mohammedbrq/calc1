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
        
        // Initial variables based on C++ logic structure
        // Logic: progressive brackets of 5000, rate increases by 0.05 (5%) each bracket starting at 5%
        
        if (x <= 5000) {
            totalTax = x * 0.05;
        } else {
            let currentRate = 0.05;
            let remainingIncome = x;
            
            // Loop logic to mimic the progressive nature
            // We use a safe loop approach
            
            while (remainingIncome > 0) {
                let taxableChunk;
                
                if (remainingIncome >= 5000) { // Changed > to >= to fix the 5000 gap bug
                    taxableChunk = 5000;
                } else {
                    taxableChunk = remainingIncome;
                }
                
                const bracketTax = taxableChunk * currentRate;
                totalTax += bracketTax;
                
                remainingIncome -= taxableChunk;
                currentRate += 0.05;
                
                // Safety break for extremely high numbers to prevent infinite loops in bad logic
                if (currentRate > 1.0) {
                   // Cap logic or let it grow? C++ let it grow.
                   // We'll let it grow as per C++ logic
                }
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
