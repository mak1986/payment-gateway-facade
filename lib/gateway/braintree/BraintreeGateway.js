(function(){
	'use strict';

	// Require necessary files
	var util = require('util');
	var Gateway = require('../Gateway');
	var braintree = require('braintree');

	
	// Constructor method

	function BraintreeGateway(){

		Gateway.call(this);

		this.config.setDefaultConfig(__dirname);
		
		this.connect();

	}

	util.inherits(BraintreeGateway, Gateway);
	

	// Public methods

	BraintreeGateway.prototype.connect = function(){

		this.gateway = braintree.connect({
			environment: braintree.Environment[this.config.get('environment')], //Development, Qa, Sandbox, Production
			merchantId: this.config.get('credentials', 'merchant_id'),
			publicKey: this.config.get('credentials', 'public_key'),
			privateKey: this.config.get('credentials', 'private_key')
		});

	};

	BraintreeGateway.prototype.makeSinglePayment = function(order, creditCard, options, callback){

		this.gateway.transaction.sale({
			'amount': order.getPrice(),
			'paymentMethodNonce': options['braintree_nonce'],
			'merchantAccountId': this.config.get('credentials', 'machant_account_id', order.getCurrency()),
			'options': {
				submitForSettlement: true
			}
		}, callback	);

	};

	BraintreeGateway.prototype.isPaymentCreated = function(result){

		return result['success'];
	
	};

	BraintreeGateway.prototype.getClientToken = function(callback){

		this.gateway.clientToken.generate({}, function(err, response){
			callback(response.clientToken);
		});

	};

	module.exports = BraintreeGateway;

}());