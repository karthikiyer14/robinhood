document.addEventListener('DOMContentLoaded', () => {
    const stocks = {
        AAPL: { price: 150 },
        GOOGL: { price: 2800 },
        TSLA: { price: 700 }
    };

    const portfolio = {};

    function updateStockList() {
        const stocksDiv = document.getElementById('stocks');
        stocksDiv.innerHTML = '';
        for (const [symbol, { price }] of Object.entries(stocks)) {
            const stockDiv = document.createElement('div');
            stockDiv.textContent = `${symbol}: $${price}`;
            stocksDiv.appendChild(stockDiv);
        }
    }

    function updatePortfolio() {
        const portfolioDiv = document.getElementById('portfolio');
        portfolioDiv.innerHTML = '';
        for (const [symbol, quantity] of Object.entries(portfolio)) {
            const portfolioItem = document.createElement('div');
            portfolioItem.textContent = `${symbol}: ${quantity} shares`;
            portfolioDiv.appendChild(portfolioItem);
        }
    }

    document.getElementById('trade-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const symbol = document.getElementById('stock-symbol').value.toUpperCase();
        const quantity = parseInt(document.getElementById('stock-quantity').value, 10);
        const tradeType = document.getElementById('trade-type').value;

        if (!stocks[symbol]) {
            alert('Stock symbol not found.');
            return;
        }

        if (tradeType === 'buy') {
            if (!portfolio[symbol]) {
                portfolio[symbol] = 0;
            }
            portfolio[symbol] += quantity;
        } else if (tradeType === 'sell') {
            if (!portfolio[symbol] || portfolio[symbol] < quantity) {
                alert('Not enough shares to sell.');
                return;
            }
            portfolio[symbol] -= quantity;
            if (portfolio[symbol] === 0) {
                delete portfolio[symbol];
            }
        }

        updatePortfolio();
        document.getElementById('trade-form').reset();
    });

    updateStockList();
    updatePortfolio();
});
