/*jshint loopfunc: true */
(function(){
	'use strict';

	var chai = require('chai');
	var expect = chai.expect;
	var GatewayFacade = require('../../../lib/gateway/GatewayFacade');

	describe('GatewayFacade', function(){

		var gatewayFacade;

		beforeEach(function(){

			gatewayFacade = new GatewayFacade();
			
			gatewayFacade.config.set('gateway_names', [
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
			]);
			
			gatewayFacade.refreshGateways();
		
		});

		describe('Throw exceptions', function(){

			describe('use()', function(){
			
				it('throw exception when gateway name doesn\'t exists', function(){			

					expect(function(){
		
						gatewayFacade.config.set('gateway_names', {});
		
						gatewayFacade.refreshGateways();
		
						gatewayFacade.use('test_gateway');
		
					}).to.throw(gatewayFacade.GatewayFacadeException);

				});

			});
			
			describe('resolveGateway() #SPEC', function(){
		
				var currencies = [ "EUR", "THB", "HKD", "SGD", 	"AUD" ];
				var index;
				
				for(index = 0; index < currencies.length; index++){

					it('throw exception when currency is ' + currencies[index] + ' and credit card is AMEX', function(){
						
						expect(function(){
							
							var order = { 'getCurrency': function(){ return currencies[index]; } };
							var creditCard = { 'getType': function(){ return 'amex'; } };
							
							gatewayFacade.resolveGateway(order, creditCard);

						}).to.throw(gatewayFacade.GatewayFacadeException);

					});

				}
			});


		});

		describe('Public methods', function(){
			
			describe('resolveGateway() #SPEC', function(){

				var creditCardTypes = [
					"visa_electron", 
					"maestro", 
					"dankort", 
					"interpayment",
					"unionpay",
					"visa",
					"mastercard",
					"diners_club",
					"discover",
					"jcb"
				];
				var creditCardTypeIndex;
				
				function testResolveGatewayAsPaypal(currency, gatewayMachineName){
		
					for(creditCardTypeIndex = 0; creditCardTypeIndex < creditCardTypes.length; creditCardTypeIndex++){
						
						it('use ' + gatewayMachineName + ' if currency is ' + currency + ' and credit card type is ' + creditCardTypes[creditCardTypeIndex], function(){
		
							var order = { 'getCurrency': function(){ return currency; } };
					 		var creditCard = { 'getType': function(){ return creditCardTypes[creditCardTypeIndex]; } };

					 		expect(gatewayFacade.resolveGateway(order, creditCard).getMachineName()).to.equal(gatewayMachineName);
		
						});

					}
				}

				testResolveGatewayAsPaypal('USD', 'paypal');
				testResolveGatewayAsPaypal('EUR', 'paypal');
				testResolveGatewayAsPaypal('AUD', 'paypal');
				testResolveGatewayAsPaypal('THB', 'braintree');
				testResolveGatewayAsPaypal('HKD', 'braintree');
				testResolveGatewayAsPaypal('SGD', 'braintree');


				it('use paypal if currency is USD and credit card type is amex', function(){
		
					var order = { 'getCurrency': function(){ return 'USD'; } };
					var creditCard = { 'getType': function(){ return 'amex'; } };
		
					expect(gatewayFacade.resolveGateway(order, creditCard).getMachineName()).to.equal('paypal');
		
				});

			});

			describe('refreshGateways()', function(){
			
				it('configured to use only 1 gateway', function(){			

					var config = [{ 
						"machine_name": "paypal", 
						"pretty_name": "PayPal",
						"module_name": "PaypalGateway"
					}];

					gatewayFacade.config.set('gateway_names', config);
					gatewayFacade.refreshGateways();

					expect(Object.keys(gatewayFacade.getGateways()).length).to.equal(1);

				});

			});

		});
		
	});

}());
