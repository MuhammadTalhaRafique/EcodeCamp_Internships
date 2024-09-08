document.addEventListener('DOMContentLoaded', function () {
    // Function to append numbers to the display
    window.appendNumber = function(number) {
        const input = document.getElementById('calc-input');
        input.value += number;
    };

    // Function to append operators to the display
    window.appendOperator = function(operator) {
        const input = document.getElementById('calc-input');
        input.value += operator;
    };

    // Function to clear the input field
    window.clearInput = function() {
        const input = document.getElementById('calc-input');
        input.value = '';
        document.getElementById('error-message').innerText = '';
    };

    // Function to calculate the result
    window.calculate = function() {
        const input = document.getElementById('calc-input');
        const expression = input.value;
        fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ expression: expression })
        })
        .then(response => response.json())
        .then(data => {
            if (data.result !== undefined) {
                input.value = data.result;
            } else if (data.error) {
                document.getElementById('error-message').innerText = data.error;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
});
