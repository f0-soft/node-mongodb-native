'use strict';

var http = require( 'http' );
var mongodb = require( '../lib/mongodb/index' );
var through = require( 'through' );



mongodb.MongoClient.connect( 'mongodb://localhost/test', function( err, db ) {
	http.createServer(function( req, res ) {
		db.collection( 'stream' ).find().stream()
			.pipe( through( function( data ) {
				this.queue( JSON.stringify( data ) + '\n' );
			} ) )
			.pipe( res );
//		db.collection( 'stream' ).find().toArray( function( err, data ) {
//			for ( var i = 0; i < data.length; i += 1 ) {
//				res.write( JSON.stringify( data[i] ) + '\n' );
//			}
//			res.end();
//		} );
	} ).listen( 8000 );
} );
