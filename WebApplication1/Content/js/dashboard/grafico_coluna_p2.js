function grafico_coluna_p2(dados) {
    google.charts.load('current', { 'packages': ['bar'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = new google.visualization.DataTable();
            data.addColumn('string', 'Cliente')
            data.addColumn('number', 'Valor')
            data.addColumn('number', 'Qtd')

        for (var i = 0; i < dados.length; i++) {
            data.addRows([
                [dados[i].nome_fanta, parseFloat(dados[i].valor_cli), parseFloat(dados[i].qtd_compras)]
            ]);


        }

        var options = {
            'width': 220,
            'height': 140,
            legend: { position: 'none', textStyle: { color: 'blue', fontSize: 12 }, alignment: 'center' },
            isStacked: true,
            chartArea: { left: 10, top: 10, width: '100%', height: '95%' }
        };

        var chart = new google.charts.Bar(document.getElementById('graficop2'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
    }

}