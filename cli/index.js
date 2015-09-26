var fs = require('fs');
var Handlebars = require('handlebars');

Handlebars.registerHelper("forObject",function(obj,options) {
    if (!obj) return [];
    var arr = Object.keys(obj).filter(function (key) { return key.charAt(0) !== '$'; } );
    return arr.map(function(key,index) {
        obj[key].$name = key;
        obj[key].$index = index;
        obj[key].$first = index === 0;
        obj[key].$last  = index === arr.length-1;
        return options.fn(obj[key]);
    }).join('');
});

var data = fs.readFileSync(__dirname+'/examples/example-service.json');
var source = fs.readFileSync(__dirname+'/templates/api.handlebars').toString();

var template = Handlebars.compile(source);
var result = template({ api: JSON.parse(data) });

fs.writeFileSync(__dirname+'/output/api.js', result);