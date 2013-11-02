/**
* Author: Kay Schneider <kayoliver82@gmail.com>
* little nodejs image loder helper
* loads all images wich are in the file loadImage defined in the 
* var loadFile...
* Quick n dirty version 
* licensed under GPL feel free to use and modify this litle tool.
*
* written with the help of "nano" :)
*
**/

var fs = require('fs'),
    sys = require('sys'),
    http = require('http'),
    url = require('url'),
    loadFile = 'loadImage'
    downloadFolder = 'loadedImages';

//open the file and read the contents
fs.readFile(loadFile,{
	encoding:'utf8'
} ,function(err,data) {
	if(err) {
		throw err;
	}
	//seperate the data on "\n" (new line on unix)
	var lines = data.split("\n");
	lines.forEach(function(item) {
		loadImage(item);
	});
	process.exit(1);
});


var loadImage  = function(urlData) {
        var hostInfo = url.parse(urlData);
	if(hostInfo.path === null) {
		console.log("error",urlData);
		process.exit(-1);
	}
	var name = hostInfo.path.split('/');
	var options  = {
		host:hostInfo.host,
		path:hostInfo.path,
		port:80
	};
	console.log('Loading Image Url:',hostInfo.href);
	

	//load the image with wget or direct in nodejs ?
	var request = http.get(options, function(res) {
		var imagedata = '';
		res.setEncoding('binary');
		res.on('data', function(chunk) {
			imagedata +=chunk;
		});

		res.on('end', function () {
			fs.writeFile( './' + downloadFolder + '/' +  name[name.length-1]);
		});
	});
	
};
