(function(){
	'use strict';

	// Require necessary file

	var mongodb = require('mongodb');
	var assert = require('assert');
	var ConfigurationHelper = require('../helper/ConfigurationHelper');

	// Constructor

	function MongoDatabase(){

		this.config = new ConfigurationHelper();
		this.config.setDefaultConfig(__dirname);
		
		this.mongoClient = mongodb.MongoClient;
		this.url = 'mongodb://' + this.config.get('host') + ':' + this.config.get('port') + '/' + this.config.get('database');
	
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