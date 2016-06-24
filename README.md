# payment-gateway-facade
[![Build Status](https://travis-ci.org/mak1986/payment-gateway-facade.svg?branch=master)](https://travis-ci.org/mak1986/payment-gateway-facade)
## A facade for payment gateways ##

The library is designed to easily add another additional payment gateways.

## Installation ##

Install bower components by running this command:
```
bower install
```

Install node modules by running this command:
```
npm install
```

## To start the app ##

Start mongodb by running this command:
```
sudo service mongod start
```
Note: If you haven't mongdb installed goto https://docs.mongodb.com/manual/installation/

Run this command to start the server and then go to http://localhost:3000.
```
npm start
```



## Adding a new payment gateway ##

__STEP 1:__ Add machine name, pretty name and module name for the new payment gateway in ./lib/gateway/config.json.

```
[
	{ 
		"machine_name": "paypal", 
		"pretty_name": "PayPal",
		"module_name": "PaypalGateway"
	},
	{
		"machine_name": "braintree", 
		"pretty_name": "Braintree",
		"module_name": "BraintreeGateway"
	}
]
```

__STEP 2:__ Create a new gateway folder in ./lib/gateway and then add a new config folder in it.

__STEP 3:__ Create a config.json file in the config folder you just created. This file holds your new payment gateway values. The code example below belongs to Braintree gateway.

```
{
	"environment": "Sandbox",
	"credentials": {
		"merchant_id": "xxxxxxxxxx",
		"public_key": "xxxxxxxxxx",
		"private_key": "xxxxxxxxxx",
		"machant_account_id": {
			"THB": "xxxxxxxxxx",
			"HKD": "xxxxxxxxxx",
			"THB": "xxxxxxxxxx"
		}
	},
	"machine_name_mapping": {
		"amex": "AmEx",
		"dankort": null ,
		"diners_club": null,
		"discover": "Discover",
		"interpayment": null,
		"jcb": "JCB",
		"maestro": "Maestro",
		"mastercard": "MasterCard",
		"unionpay": "Unionpay",
		"visa": "Visa",
		"visa_electron": null 
	},
	"machine_name": "braintree"
}
```

__STEP 4:__ Create a new file in your new payment gateway folder. Make sure to Implement the methods as showing in the code below.

```
(function(){
	'use strict';

	// Require your new payment gateway module here.
	var config = require('./config/config.json');

	
	// Constructor method
	
	function YourNewPaymentGateway(){

		// add configuration files here

		this.connect();

	};

	
	// Public methods

	YourNewPaymentGateway.prototype.connect = function(){
		
		// Implement this.

	};

	YourNewPaymentGateway.prototype.makeSinglePayment = function(order, creditCard, options, callback){
		
		// Implement this.

	};



	// PaypalGateway.prototype.getClientToken = function(callback){

	//	Uncomment and implement this if your new gateway requires the client to get a client token. 
	//	If you implement this method you will need to edit the  ./public/js/clientTokenSetup.js file.
	
	// };

	YourNewPaymentGateway.prototype.isPaymentCreated = function(result){

		return // Implement this.
	
	};

	YourNewPaymentGateway.prototype.isPaymentApproved = function(result){

		return // Implement this.
	
	};

	YourNewPaymentGateway.prototype.getMachineName = function(){

		return this.getConfig('machine_name');

	};

	// Helper methods

	YourNewPaymentGateway.prototype.addConfig = function(key, value){

		this.config[key] = value;
	
	};

	YourNewPaymentGateway.prototype.getConfig = function(key){

		return this.config[key];

	};


	module.exports = YourNewPaymentGateway;

}());
```
__STEP 5:__ That's it now try run the app.
