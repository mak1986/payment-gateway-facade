(function(){
	'use strict';

	// Require necessary files
	var util = require('util');
	var Gateway = require('../Gateway');
	var paypal = require('paypal-rest-sdk');

	
	// Constructor method
	
	function PaypalGateway(){

		Gateway.call(this);

		this.config.setDefaultConfig(__dirname);

		this.connect();

	}

	util.inherits(PaypalGateway, Gateway);


	// Public methods

	PaypalGateway.prototype.connect = function(){

		this.gateway = paypal;

		this.gateway.configure({
			'mode': this.config.get('environment'), //sandbox or live
			'client_id': this.config.get('credentials', 'client_id'),
			'client_secret': this.config.get('credentials', 'client_secret')
		});

	};

	PaypalGateway.prototype.makeSinglePayment = function(order, creditCard, options, callback){
		
		var createPaymentJson = {
		    "intent": "sale",
		    "payer": {
		        "payment_method": "credit_card",
		        "funding_instruments": [{
		            "credit_card": {
		                "type": this.config.get('machine_name_mapping', creditCard.getType()),
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

		this.gateway.payment.create(createPaymentJson, callback);

	};

	PaypalGateway.prototype.isPaymentCreated = function(result){

		return (result['state'] == 'created');
	
	};

	PaypalGateway.prototype.isPaymentApproved = function(result){

		return (result['state'] == 'approved');
	
	};

	module.exports = PaypalGateway;

}());