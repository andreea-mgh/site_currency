function exchangeCurrency() {
    
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    
    fetch(`https://api.frankfurter.app/latest?base=${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[toCurrency];
            const convertedAmount = amount * rate;
            document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
            document.getElementById('error').innerText = 'Error fetching exchange rates.';
        });
};