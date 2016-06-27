(function(){
	'use strict';

	var chai = require('chai');
	var expect = chai.expect;
	var Order = require('../../../lib/model/order/Order');

	describe('Order', function(){
			
		var order;

		beforeEach(function(){

			order = new Order({
				'price':'100', 
				'currency':'USD'
			});
		
		});

		describe('Throw exceptions', function(){

			describe('setPrice()', function(){
			
				it('should throw exception when parsing an alphabetical argument', function(){			

					expect(function(){
		
						order.setPrice('xyz');
		
					}).to.throw(order.OrderException);

				});

				it('should throw exception when parsing a boolean argument', function(){
					
					expect(function(){
		
						order.setPrice(true);
		
					}).to.throw(order.OrderException);
					
					expect(function(){
		
						order.setPrice(false);
		
					}).to.throw(order.OrderException);
					
				});

				it('should throw exception when parsing an undefined argument', function(){
					
					expect(function(){
		
						order.setPrice(undefined);
		
					}).to.throw(order.OrderException);

				});

			});

			describe('setCurrency()', function(){
			
				it('should throw exception when parsing an alphabetical argument', function(){			

					expect(function(){
		
						order.setPrice('xyz');
		
					}).to.throw(order.OrderException);

				});

				it('should throw exception when parsing a boolean argument', function(){
					
					expect(function(){
		
						order.setPrice(true);
		
					}).to.throw(order.OrderException);
					
					expect(function(){
		
						order.setPrice(false);
		
					}).to.throw(order.OrderException);
					
				});

				it('should throw exception when parsing an undefined argument', function(){
					
					expect(function(){
		
						order.setPrice(undefined);
		
					}).to.throw(order.OrderException);

				});

			});
		});

		describe('Public methods', function(){

			describe('Get methods', function(){

				it('getPrice() should return the correct price', function(){
		
					expect(order.getPrice()).to.equal('100');
		
				});

				it('getCurrency() should return the correct currency', function(){
		
					expect(order.getCurrency()).to.equal('USD');
		
				});

			});

		});
		
	});

}());