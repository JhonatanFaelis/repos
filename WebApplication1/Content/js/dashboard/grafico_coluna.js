google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data = google.visualization.arrayToDataTable([
                ['Task', 'Hours per Day'],
                ['Work', 11],
                ['Eat', 2],
                ['Commute', 2],
                ['Watch TV', 2],
                ['Sleep', 7]
            ]);

            var options = {
                'width': 443,
                'height': 300,
                legend: { position: 'bottom', textStyle: { color: 'blue', fontSize: 12 }, alignment: 'center' },
                chartArea:{left:20,top:10,width:'100%',height:'90%'}
            };
            var chart = new google.visualization.ColumnChart(document.getElementById('grafico'));

            chart.draw(data, options);
        }