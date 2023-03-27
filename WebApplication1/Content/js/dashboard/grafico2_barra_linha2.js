
function grafico2_barra_linha2(dados) {
    google.charts.load('current', { 'packages': ['bar'] });
    google.charts.setOnLoadCallback(drawChart);

    const dataAsArray = [
        dados.map(value => value.total),
        dados.map(value => value.mes)
    ];

    //console.log(dataAsArray)

    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string','Mes')
        data.addColumn('number','Vendas')
        data.addColumn('number','Ticket Medio')
        data.addColumn('number','Ticket Medio Produtos')

        for (var i = 0; i < dados.length; i++) {
            data.addRows([
                [dados[i].mes, parseFloat(dados[i].total), parseFloat(dados[i].ticket_medio), parseInt(dados[i].ticket_medio_produto)]
            ]);
            

        }
        


        var options = {
            'width': 445,
            'height': 300,
            legend: { position: 'top', textStyle: { color: 'blue', fontSize: 12 }, alignment: 'end' },
            chartArea: { left: 20, top: 10, width: '100%', height: '90%' },
            bars: 'horizontal',// Required for Material Bar Charts.
           

            
        };

        var chart = new google.charts.Bar(document.getElementById('barralinha2'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
    }

}



