function grafico_coluna_p(fixa,variavel, ano) {
    google.charts.load('current', { 'packages': ['bar'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Ano', 'Custo Fixo', 'Custo Variavel'],
            [ano, parseFloat(fixa.despesa_fixa), parseFloat(variavel.despesa_variavel)],

        ]);

        var options = {
            'width': 200,
            'height': 140,
            tooltip: { isHtml: true },
            legend: { position: 'none', textStyle: { color: 'blue', fontSize: 12 }, alignment: 'center' },
            //vAxis: { format: '0.00' },
            chartArea: { left: 20, top: 10, width: '100%', height: '90%' }
        };

        var formatter = new google.visualization.NumberFormat({
            decimalSymbol: ',',
            groupingSymbol: '.',
            prefix: 'R$ '
        });
        // Estou aplicando para as colunas 2 e 3
        formatter.format(data, 1);
        formatter.format(data, 2);
        

        var chart = new google.charts.Bar(document.getElementById('graficop1'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
    }

}