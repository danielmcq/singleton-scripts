/**
 * A simple Node.js based tool for downloading images from a sub-board on 4chan.
 *
 * @author Daniel McQuiston daniel.pro@dehugo.net
 *
 * @version 0.1
 */
var fourchan = function( args ){
	var http      = require("http"),
	    cheerio   = require("cheerio"),
	    fs        = require("fs"),
	    readline  = require("readline");

	var rl = readline.createInterface({
		input:  process.stdin,
		output: process.stdout
	});

	var download = function(url, dest, cb) {
		var file = fs.createWriteStream(dest);
		var request = http.get(url, function(res) {
			res.pipe( file );
			file.on('finish', function() {
				file.close();
				cb(dest);
			});
		});
	}

	var getFileList = function( $ ){
		var aFiles = [];
		var aPosts = $( ".postContainer" );

		for ( var i = 0; i < aPosts.length; i++ ) {
			var data = {};
			var post = $( aPosts[i] );

			data.source = "http:" + post.find( ".fileText a" ).attr( "href" );
			data.fileName = post.find( ".fileText a" ).attr( "title" );
			if ( !data.fileName ) {
				data.fileName = post.find( ".fileText a" ).text();
			}
			data.desc = post.find( ".postMessage" ).text();

			if ( data.fileName ) {
				aFiles.push( data );
			}
		}

		getFiles( aFiles );
	};

	var getFiles = function( aFiles ) {
		for ( var i = 0; i < aFiles.length; i++ ) {
			var uniqueFilename = aFiles[i].fileName;
			var aUrlPath = aFiles[i].source.split("/");

			uniqueFilename += "-" + aUrlPath[ aUrlPath.length -1 ];
			download(aFiles[i].source, uniqueFilename, function(dest){
				console.log("File '"+dest+"' downloaded successfully!");
			});
		}
	};

	var getBoardHtml = function( boardUrl ) {
		http.get( boardUrl, function(res){
			var boardHtml = "";

			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				boardHtml += chunk.toString();
			});
			res.on('end',function(){
				getFileList( cheerio.load( boardHtml ) );
			});

		} );
	};


	var promptUserForUrl = function( callback ){
		rl.question("Please input the complete URL of the 4chan board to download:\n", function( ans ){
			callback( ans );

			rl.close();
		});
	};


	var $listArguments = function(){
		args.forEach(function (val, index, array) {
			console.log(index + ': ' + val);
		});
	}


	this.init = function(){
		promptUserForUrl( getBoardHtml );
	};

	return this;
};

fourchan( process.argv ).init();