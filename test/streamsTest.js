'use strict';

var http = require( 'http' );
var mongodb = require( '../lib/mongodb/index' );

function tr( data ) { return JSON.stringify( data ) + '\n'; }

mongodb.MongoClient.connect( 'mongodb://localhost/test', function( err, db ) {
	http.createServer(function( req, res ) {
		var cursor = db.collection( 'stream' )
			.find()
			.batchSize( 100 )
			.stream( { transform: tr } )
			.pipe( res );
//		db.collection( 'stream' ).find().toArray( function( err, data ) {
//			for ( var i = 0; i < data.length; i += 1 ) {
//				res.write( JSON.stringify( data[i] ) + '\n' );
//			}
//			res.end();
//		} );
	} ).listen( 8000 );
} );
