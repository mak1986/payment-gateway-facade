(function(){
	'use strict';

	// Require necessary file

	var mongodb = require('mongodb');
	var assert = require('assert');

	// Constructor

	function MongoDatabase(){

		this.mongoClient = mongodb.MongoClient;
		this.url = 'mongodb://localhost:27017/gateway_payment_test';
	
	}

	// Public method

	MongoDatabase.prototype.insert = function(collection, data, callback){

		this.mongoClient.connect(this.url, function(err, db) {

			assert.equal(null, err);
			 
			db.collection(collection).insertOne( data, function(err, result) {
				assert.equal(err, null);
				db.close();
				callback();
			});

		});
	
	}

	module.exports = MongoDatabase;

}());