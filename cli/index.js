var fs = require('fs');
var dots = require("dot");

var data = fs.readFileSync(__dirname+'/examples/example-service.json');
var source = fs.readFileSync(__dirname+'/templates/api.dot').toString();

console.log(source);

var template = dots.template(source);

var result = template({ api: JSON.parse(data) });

fs.writeFileSync(__dirname+'/output/api.js', result);