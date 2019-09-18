var revenue = [];
var years = [];
var chart;
var ctx = document.getElementById('myChart').getContext('2d');

function loadValue() {

    fetch('https://financialmodelingprep.com/api/v3/financials/income-statement/aapl')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {

            var i;
            for (i = (myJson.financials.length - 1); i > 0; i--) {
                revenue.push(myJson.financials[i].Revenue);
                years.push(myJson.financials[i].date.substring(0, 4));
            }
            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [{
                        label: 'Apple revenue',
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
        });
}

loadValue();