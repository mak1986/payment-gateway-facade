// Abstract class for all gateways.
(function(){
	'use strict';

	var ConfigurationHelper = require('../helper/ConfigurationHelper');


	// Constructor method

	function Gateway(){

		this.config = new ConfigurationHelper();

	}

	// Exception

	Gateway.prototype.GatewayException = function(message){

		this.message = message;
		this.name = "GatewayException";
	
	};

	Gateway.prototype.connect = function(){

		throw new this.GatewayException('connect method must be overrided');

	};

	Gateway.prototype.makeSinglePayment = function(order, creditCard, options, callback){
		/* jshint unused:false */

		throw new this.GatewayException('makeSinglePayment method must be overrided');
	
	};

	Gateway.prototype.getClientToken = function(callback){
		/* jshint unused:false */

	 	return false;
	
	};

	Gateway.prototype.isPaymentCreated = function(result){
		/* jshint unused:false */

		throw new this.GatewayException('makeSinglePayment method must be overrided');
	
	};

	Gateway.prototype.isPaymentApproved = function(result){
		/* jshint unused:false */

		return false;
	
	};

	Gateway.prototype.getMachineName = function() {

		return this.config.get('machine_name');
	
	};

	Gateway.prototype.getCamelCaseName = function() {
	
		return this.config.get('camel_case');
	
	};

	module.exports = Gateway;

}());