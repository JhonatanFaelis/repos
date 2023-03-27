
function grafico_barra_linha2(dados) {
    google.charts.load('current', { 'packages': ['bar'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Mes')
        data.addColumn('number', 'Contas Pagas')
        data.addColumn('number', 'Lucro Bruto')
        data.addColumn('number', 'Total Vendido')
        

        for (var i = 0; i < dados.length; i++) {
            data.addRows([
                [dados[i].MES_TEXTO, parseFloat(dados[i].TOTAL_CONTAS_PAGAR), parseInt(dados[i].FAT_BRUTO) ,parseFloat(dados[i].VALOR_TOTAL_VENDA)]
            ]);
            

        }

        var options = {
            'width': 445,
            'height': 300,
            legend: { position: 'top', textStyle: { color: 'blue', fontSize: 12 }, alignment: 'end' },
            chartArea: { left: 20, top: 10, width: '100%', height: '90%' },
            bars: 'horizontal',// Required for Material Bar Charts.



        };

        var chart = new google.charts.Bar(document.getElementById('barra1linha2'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
    }
}


