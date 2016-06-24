(function(){
	'use strict';

	// Require necessary file

	var currencies = require('./config/currencies');

	// Constructor method

	function Order(properties) {
		
		// set configuration
		this.config = {};
		this.addConfig('currencies', currencies);
		
		// set basic properties
		this.setPrice(properties['price']);
		this.setCurrency(properties['currency']);

	}
	
	// Exception

	Order.prototype.OrderException = function(message){

		this.message = message;
		this.name = "OrderException";
	
	}

	// Public methods

	// Set methods

	Order.prototype.setPrice = function(price){
		
		if(parseFloat(price)){
			
			this.price = price;
		
		}else{

			throw new this.OrderException('Price must be a nummeric value.');
		
		}

	}

	Order.prototype.setCurrency = function(currency){
		
		var i;
		var currencies = this.getConfig('currencies');

		for(i = 0; i < currencies.length; i++){

			if(currency == currencies[i]){

				this.currency = currency;
				return;

			}

		}

		throw new this.OrderException('Wrong currency.');

	}

	// Get methods

	Order.prototype.getPrice = function(){

		return this.price;

	}

	Order.prototype.getCurrency = function(){

		return this.currency;
		
	}
	
	// Helper methods

	Order.prototype.addConfig = function(key, value){

		this.config[key] = value;
	
	}

	Order.prototype.getConfig = function(key){

		return this.config[key];
	
	}

	module.exports = Order;

}());