function grafico2_area_linha2(dados) {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        //var data = google.visualization.arrayToDataTable([
        //    ['Year', 'Sales', 'Expenses'],
        //    ['2013', 1000, 400],
        //    ['2014', 1170, 460],
        //    ['2015', 660, 1120],
        //    ['2016', 1030, 540]
        //]);

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Mes')
        data.addColumn('number', 'Venda')
        data.addColumn('number', 'Despesas')

        for (var i = 0; i < dados.length; i++) {
            data.addRows([
                [dados[i].mes, parseFloat(dados[i].venda_mensal), parseFloat(dados[i].contas_pagas)]
            ]);

        }

      

      

        var options = {
            'width': 200,
            'height': 140,
            legend: { position: 'top', textStyle: { color: 'blue', fontSize: 12 }, alignment: 'center' },
            chartArea: { left: 20, top: 0, width: '100%', height: '90%' },
            hAxis: { title: 'Ano', titleTextStyle: { color: '#333' } },
            vAxis: { minValue: 0 }
        };

        var chart = new google.visualization.AreaChart(document.getElementById('areachart'));
        chart.draw(data, options);
    }


}