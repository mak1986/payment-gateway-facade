(function(){
	'use strict';

	// Require necessary file
	
	var ConfigurationHelper = require('../../helper/ConfigurationHelper');

	
	// Constructor method

	function Order(properties) {
		
		// set configuration
		this.config = new ConfigurationHelper();
		this.config.setDefaultConfig(__dirname);
		
		// set basic properties
		this.setPrice(properties['price']);
		this.setCurrency(properties['currency']);

	}
	
	// Exception

	Order.prototype.OrderException = function(message){

		this.message = message;
		this.name = "OrderException";
	
	};

	// Public methods

	// Set methods

	Order.prototype.setPrice = function(price){
		
		if(parseFloat(price)){
			
			this.price = price;
		
		}else{

			throw new this.OrderException('Price must be a nummeric value.');
		
		}

	};

	Order.prototype.setCurrency = function(currency){
		
		var i;

		for(i = 0; i < this.config.get('currencies').length; i++){

			if(currency == this.config.get('currencies', i)){

				this.currency = currency;
				
				return;

			}

		}

		throw new this.OrderException('Wrong currency.');

	};

	// Get methods

	Order.prototype.getPrice = function(){

		return this.price;

	};

	Order.prototype.getCurrency = function(){

		return this.currency;
		
	};
	

	module.exports = Order;

}());