/*
    Charts are created with the help of https://www.chartjs.org/ 
    Author: Sigge, https://github.com/strazan
*/

var years = [];
var chart;
var ctx = document.getElementById('myChart').getContext('2d');
loadChart('aapl');

/* 
    loads the chart by data fetched from 'financialmodelingprep.com'
*/
function loadChart(company, title) {
    fetch('https://financialmodelingprep.com/api/v3/financials/income-statement/' +
            company + '?period=quarter')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            revenue = [];
            years = [];
            for (i = (myJson.financials.length - 1); i > 0; i--) {
                revenue.push(myJson.financials[i].Revenue);
                if(i%4 == 0 ? years.push(myJson.financials[i].date.substring(0, 4)) : years.push(''));   
            }
            updateChart(title)
        });
}
/*
    updates the chart with the newly loaded data.
*/
function updateChart(title) {

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: title + ' revenue',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: revenue
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function (value, index, values) {
                            return value / 1e9 + 'B';
                        }
                    }
                }]
            }
        }
    });
}