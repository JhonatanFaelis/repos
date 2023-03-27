function grafico_pizza_p(dados) {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Grupo')
        data.addColumn('number', 'Valor')

        for (var i = 0; i < dados.length; i++) {
            data.addRows([
                [dados[i].nome_grupo, parseFloat(dados[i].valor)]
            ]);


        }

        var options = {
            'width': 200,
            'height': 140,
            legend: { position: 'top', textStyle: { color: 'blue', fontSize: 12 }, alignment: 'center' },
            chartArea: { left: 0, top: 20, width: '100%', height: '90%' }
        };
        var chart = new google.visualization.PieChart(document.getElementById('graficop3'));

        chart.draw(data, options);
    }
}