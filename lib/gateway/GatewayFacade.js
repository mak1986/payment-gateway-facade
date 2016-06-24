(function(){
	'use strict';

	// Require config file
	var gatewayNames = require('./config.json');
	
	// require database
	var database = new (require('../database/MongoDatabase'))();

	// Models	
	var CreditCard = require('../model/creditCard/CreditCard');
	var Order = require('../model/order/Order');

	
	// Constructor method
	
	function GatewayFacade(){

		this.config = {};
		this.addConfig('gateway_names', gatewayNames);
		this.refreshGateways();
		
	}


	// Exception
	
	GatewayFacade.prototype.GatewayFacadeException = function(message){

		this.message = message;
		this.name = "GatewayFacadeException";
	
	};
	
	// Private methods

	function insertToDatabase(collection, order, paymentResponse, callback){
		
		var data = { 
			'order': { 
				'price': order.getPrice(), 
				'currency': order.getCurrency() 
			}, 
			'payment_response': paymentResponse
		};

		database.insert(collection, data, callback );
	
	};


	// Public methods

	GatewayFacade.prototype.use = function(gatewayName){
		
		if(this.gateways[gatewayName]){
			return this.gateways[gatewayName];
		}
		
		throw new this.GatewayFacadeException('The requested gateway doesn\'t exist.');

	};

	GatewayFacade.prototype.resolveGateway = function(order, creditCard){

		if(creditCard.getType() == 'amex'){
			if(order.getCurrency() != 'USD'){
				throw new this.GatewayFacadeException('AMEX is possible to use only for USD.')
			}else{
				return this.use('paypal');
			}
		}else{
			if(['USD','EUR','AUD'].indexOf(order.getCurrency()) > -1){
				return this.use('paypal');
			}else{
				return this.use('braintree');
			}
		}

	};

	GatewayFacade.prototype.makeSinglePayment = function(req, callback){
		
		try{
						
			var gateway;
			var gatewayOptions = {};
			var order = new Order(req.body);
			var creditCard = new CreditCard(req.body);
			var successfulMessage = 'Your payment was successful.';

			gateway = this.resolveGateway(order, creditCard);
			
			if(gateway.getMachineName() == 'braintree'){
				gatewayOptions['braintree_nonce'] = req.body.braintree_nonce;
			}

			gateway.makeSinglePayment(order, creditCard, gatewayOptions, function (error, result) {
				
				if (error) {
					throw error;
				} else {

					if(gateway.isPaymentCreated(result)){
						
						// save to database
						insertToDatabase(gateway.getMachineName(), order, result, function(){
							callback(false, { 'success': successfulMessage })
						});
						
					}else if(gateway.isPaymentApproved(result)){
						callback({ 'error': 'Execute an approved PayPal payment not yet implemented.' }, null)
					}else{
						callback({ 'error': result.message }, null)
					}
				}

			});

		}catch(error){

			callback({ 'error': error.message }, null)
	
		}

	};

	GatewayFacade.prototype.refreshGateways = function(){

		// reset gateways
		this.gateways = {};

		var index, gatewayName;
		
		for(index = 0; index < this.getConfig('gateway_names').length; index++){

			gatewayName = this.getConfig('gateway_names')[index]
			this.gateways[gatewayName['machine_name']] = new (require('./' +gatewayName['machine_name'] + '/' + gatewayName['module_name']))();
		
		}

	}
	
	// Get methods

	GatewayFacade.prototype.getGateways = function(){

		return this.gateways
	
	};

	// Helper methods

	GatewayFacade.prototype.addConfig = function(key, value){

		this.config[key] = value;
	
	}

	GatewayFacade.prototype.getConfig = function(key){

		return this.config[key];

	}

	module.exports = GatewayFacade;

}());