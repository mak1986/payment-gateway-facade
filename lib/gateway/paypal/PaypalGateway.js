(function(){
	'use strict';

	// Require necessary files

	var paypal = require('paypal-rest-sdk');
	var config = require('./config/config.json');

	
	// Constructor method
	
	function PaypalGateway(){

		this.config = {};
		this.addConfig('environment', config['environment']);
		this.addConfig('credentials', config['credentials']);
		this.addConfig('machine_name_mapping', config['machine_name_mapping']);
		this.addConfig('machine_name', config['machine_name']);

		this.connect();

	};

	
	// Public methods

	PaypalGateway.prototype.connect = function(){
		
		paypal.configure({
		  'mode': this.getConfig('environment'), //sandbox or live
		  'client_id': this.getConfig('credentials')['clientId'],
		  'client_secret': this.getConfig('credentials')['clientSecret']
		});

	};

	PaypalGateway.prototype.makeSinglePayment = function(order, creditCard, options, callback){
		
		var createPaymentJson = {
		    "intent": "sale",
		    "payer": {
		        "payment_method": "credit_card",
		        "funding_instruments": [{
		            "credit_card": {
		                "type": this.getConfig('machine_name_mapping')[creditCard.getType()],
		                "number": creditCard.getNumber(),
		                "expire_month": creditCard.getExpirationMonth(),
		                "expire_year": creditCard.getExpirationYear(),
		                "cvv2": creditCard.getCvv(),
		                "first_name": creditCard.getFirstName(),
		                "last_name": creditCard.getLastName(),
		            }
		        }]
		    },
		    "transactions": [{
		        "amount": {
		            "total": order.getPrice(),
		            "currency": order.getCurrency()
		        }
		    }]
		};

		paypal.payment.create(createPaymentJson, callback);

	};


	// PaypalGateway.prototype.getClientToken = function(callback){
	// 	// pass
	// };

	PaypalGateway.prototype.isPaymentCreated = function(result){

		return (result['state'] == 'created');
	
	};

	PaypalGateway.prototype.isPaymentApproved = function(result){

		return (result['state'] == 'approved');
	
	};

	PaypalGateway.prototype.getMachineName = function(){

		return this.getConfig('machine_name');

	};

	// Helper methods

	PaypalGateway.prototype.addConfig = function(key, value){

		this.config[key] = value;
	
	};

	PaypalGateway.prototype.getConfig = function(key){

		return this.config[key];

	};


	module.exports = PaypalGateway;

}());