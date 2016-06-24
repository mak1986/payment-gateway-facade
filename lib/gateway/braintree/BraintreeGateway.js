(function(){
	'use strict';

	// Require necessary files

	var braintree = require('braintree');
	var config = require('./config/config.json');

	
	// Constructor method

	function BraintreeGateway(){

		this.config = {};
		this.addConfig('environment', config['environment']);
		this.addConfig('credentials', config['credentials']);
		this.addConfig('machine_name_mapping', config['machine_name_mapping']);
		this.addConfig('machine_name', config['machine_name']);
		
		this.connect();

	};

	
	// Public methods

	BraintreeGateway.prototype.connect = function(){

		this.gateway = braintree.connect({
				  environment: braintree.Environment[this.getConfig('environment')], //Development, Qa, Sandbox, Production
				  merchantId: this.getConfig('credentials')['merchant_id'],
				  publicKey: this.getConfig('credentials')['public_key'],
				  privateKey: this.getConfig('credentials')['private_key']
				});

	};

	BraintreeGateway.prototype.makeSinglePayment = function(order, creditCard, options, callback){

		this.gateway.transaction.sale({
			'amount': order.getPrice(),
			'paymentMethodNonce': options['braintree_nonce'],
			'merchantAccountId': this.getMachantAccountIdByCurrency(order.getCurrency()),
			'options': {
				submitForSettlement: true
			}
		}, callback	);

	};


	BraintreeGateway.prototype.isPaymentCreated = function(result){

		return result['success'];
	
	};

	BraintreeGateway.prototype.isPaymentApproved = function(result){

		return false
	
	};

	BraintreeGateway.prototype.getMachantAccountIdByCurrency = function(currency){

		return this.getConfig('credentials')['machant_account_id'][currency];

	};

	BraintreeGateway.prototype.getClientToken = function(callback){

		this.gateway.clientToken.generate({}, function(err, response){
			callback(response.clientToken);
		});

	};

	BraintreeGateway.prototype.getMachineName = function(){

		return this.getConfig('machine_name');

	};

	// Helper methods

	BraintreeGateway.prototype.addConfig = function(key, value){

		this.config[key] = value;
	
	};

	BraintreeGateway.prototype.getConfig = function(key){

		return this.config[key];

	};

	module.exports = BraintreeGateway;

}());