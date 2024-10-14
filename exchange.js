function exchangeCurrency() {
    
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    if(amount === '' || isNaN(amount)) {
        document.getElementById('error').innerText = 'Trebuie să introduci o valoare numerică în câmpul de mai sus.';
        return;
    }
    
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

function switchCurrencies() {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    updateToCurrencyOptions();
    toCurrency.value = temp;
}

function updateToCurrencyOptions() {
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency');
    const options = ['RON', 'USD', 'EUR', 'GBP', 'PLN'];

    toCurrency.innerHTML = '';
    options.forEach(option => {
        if (option !== fromCurrency) {
            const opt = document.createElement('option');
            opt.value = option;
            opt.innerText = option;
            toCurrency.appendChild(opt);
        }
    });
}

// cand se incarca pagina
updateToCurrencyOptions();
// cand selectez
document.getElementById('from-currency').addEventListener('change', updateToCurrencyOptions);