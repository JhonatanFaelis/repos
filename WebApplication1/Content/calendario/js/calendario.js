var events = [
  {'Date': new Date(2019, 10, 7), 'Title': 'teste 1.'},
  {'Date': new Date(2019, 11, 18), 'Title': 'teste 2', 'Link': 'https://www.google.com'},
  {'Date': new Date(2019, 11, 27), 'Title': 'teste 3', 'Link': 'https://www.google.com'},
];
var settings = {};
var element = document.getElementById('caleandar');
caleandar(element, events, settings);
