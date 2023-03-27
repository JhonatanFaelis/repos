function grafico_coluna_linha2_p(dados) {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Descrição')
        data.addColumn('number', 'Quantidade')

        for (var i = 0; i < dados.length; i++) {
            data.addRows([
                [dados[i].descri, parseFloat(dados[i].qtd)]
            ]);

        }

        var options = {
            'width': 200,
            'height': 140,
            legend: { position: 'bottom', textStyle: { color: 'blue', fontSize: 12 }, alignment: 'center' },
            chartArea: { left: 20, top: 10, width: '100%', height: '90%' }
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('colunalinha2'));

        chart.draw(data, options);
    }

}


