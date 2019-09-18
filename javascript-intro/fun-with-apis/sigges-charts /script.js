var revenue = [];
var years = [];
var chart;
var company;
var ctx = document.getElementById('myChart').getContext('2d');
loadChart('Apple');


function fetchMoney(companyShort) {

    fetch('https://financialmodelingprep.com/api/v3/financials/income-statement/' + companyShort + '?period=quarter')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            revenue = [];
            years = [];
            for (i = (myJson.financials.length - 1); i > 0; i--) {
                revenue.push(myJson.financials[i].Revenue);
                years.push(myJson.financials[i].date.substring(0, 7));
            }
            updateChart(company)
        });
}

function loadChart(comp) {
    company = comp;
    switch (company) {
        case 'Apple':
            fetchMoney('aapl');
            break;

        case 'Alphabet':
            fetchMoney('goog');
            break;

        case 'Facebook':
            fetchMoney('fb');
            break;

        case 'Tesla':
            fetchMoney('tsla');
            break;

        case 'Amazon':
            fetchMoney('amzn');
            break;
    }

}

function updateChart(company) {

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: company + ' revenue',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: revenue
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Abbreviate the millions
                        callback: function (value, index, values) {
                            return value / 1e9 + 'B';
                        }
                    }
                }]
            }
        }
    });
    
}