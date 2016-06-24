var chai = require('chai');
var expect = chai.expect;
var CreditCard = require('../../../lib/model/creditCard/CreditCard');

describe('CreditCard', function(){

	var creditCard;

	beforeEach(function(){
		creditCard = new CreditCard({
			'credit_card_holder_name':'John Doe', 
			'credit_card_number':'4111111111111111',
			'credit_card_cvv':'100', 
			'credit_card_expiration_date':'10/2020'
		});
	});

	describe('Throw exceptions', function(){

		describe('setHolderName()', function(){
		
			it('throw exception when first name or last name is missing in holder name', function(){			

				expect(function(){
					creditCard.setHolderName('John')
				}).to.throw(creditCard.CreditCardException);

			});

		});

		describe('setCvv()', function(){
		
			it('throw exception when the length greater than 4', function(){			

				expect(function(){
					creditCard.setCvv('12345')
				}).to.throw(creditCard.CreditCardException);

			});

			it('throw exception when the length less than 3', function(){			

				expect(function(){
					creditCard.setCvv('12')
				}).to.throw(creditCard.CreditCardException);

			});

		});

		describe('setExpirationDate()', function(){
		
			it('throw exception when the month and year isn\'t seperated by \"/\"', function(){			

				expect(function(){
					creditCard.setExpirationDate('122020')
				}).to.throw(creditCard.CreditCardException);

			});

			it('throw exception when the month string is greater than 2', function(){			

				expect(function(){
					creditCard.setExpirationDate('123/2020')
				}).to.throw(creditCard.CreditCardException);

			});

			it('throw exception when the month string is less than 1', function(){			

				expect(function(){
					creditCard.setExpirationDate('/2020')
				}).to.throw(creditCard.CreditCardException);

			});

			it('throw exception when the year string is greater than 4', function(){			

				expect(function(){
					creditCard.setExpirationDate('12/20200')
				}).to.throw(creditCard.CreditCardException);

			});
			
			it('throw exception when the year string is less than 4', function(){			

				expect(function(){
					creditCard.setExpirationDate('12/202')
				}).to.throw(creditCard.CreditCardException);

			});

			it('throw exception when the month string is not nummeric', function(){			

				expect(function(){
					creditCard.setExpirationDate('xx/2020')
				}).to.throw(creditCard.CreditCardException);

			});

			it('throw exception when the year string is not nummeric', function(){			

				expect(function(){
					creditCard.setExpirationDate('12/xxxx')
				}).to.throw(creditCard.CreditCardException);

			});

		});
		
	});

	describe('Public methods', function(){
		
		// ref: http://stackoverflow.com/questions/72768/how-do-you-detect-credit-card-type-based-on-number#answer-19138852
		describe('detectCard() # Credit card detection: ', function(){

			var cards = {
				'345936346788903': 'American Express',
				'377669501013152': 'American Express',
				'373083634595479': 'American Express',
				'370710819865268': 'American Express',
				'371095063560404': 'American Express',

				'5019000000000000': 'Dankort',

				'30569309025904': 'Diners Club',
				'38520000023237': 'Diners Club',

				'6011894492395579': 'Discover',
				'6011388644154687': 'Discover',
				'6011880085013612': 'Discover',
				'6011652795433988': 'Discover',
				'6011375973328347': 'Discover',

				'6360000000000000': 'Interpayment',

				'3528000000000000': 'JCB',
				'3589000000000000': 'JCB',
				'3529000000000000': 'JCB',

				'8800000000000000': 'Unionpay',

				'5018000000000000': 'Maestro',
				'5020000000000000': 'Maestro',
				'5038000000000000': 'Maestro',
				'5612000000000000': 'Maestro',
				'5893000000000000': 'Maestro',
				'6304000000000000': 'Maestro',
				'6759000000000000': 'Maestro',
				'6761000000000000': 'Maestro',
				'6762000000000000': 'Maestro',
				'6763000000000000': 'Maestro',
				'0604000000000000': 'Maestro',
				'6390000000000000': 'Maestro',

				'5280934283171080': 'MasterCard',
				'5456060454627409': 'MasterCard',
				'5331113404316994': 'MasterCard',
				'5259474113320034': 'MasterCard',
				'5442179619690834': 'MasterCard',
				
				'4916338506082832': 'Visa',
				'4556015886206505': 'Visa',
				'4539048040151731': 'Visa',
				'4024007198964305': 'Visa',
				'4716175187624512': 'Visa',

				'4026000000000000': 'Visa Electron',
				'4175000000000000': 'Visa Electron',
				'4405000000000000': 'Visa Electron',
				'4508000000000000': 'Visa Electron',
				'4844000000000000': 'Visa Electron',
				'4913000000000000': 'Visa Electron',
				'4917000000000000': 'Visa Electron'
	        };

	        Object.keys(cards).forEach(function(number) {
	            it('detect card ' + number + ' as ' + cards[number], function() {
	                expect(creditCard.getConfig('credit_card_types')[creditCard.detectType(number)]['pretty_name']).to.equal(cards[number]);
	            });
	        });

		});

		describe('Get methods', function(){

			it('getHolderName() return the correct credit card holder name', function(){
				expect(creditCard.getHolderName()).to.equal('John Doe');
			});

			it('getFirstName() return the correct first name', function(){
				expect(creditCard.getFirstName()).to.equal('John');
			});

			it('getLastName() return the correct last name', function(){
				expect(creditCard.getLastName()).to.equal('Doe');
			});

			it('getNumber() return the correct credit card number', function(){
				expect(creditCard.getNumber()).to.equal('4111111111111111');
			});

			it('getCvv() return the correct credit card CVV number', function(){
				expect(creditCard.getCvv()).to.equal('100');
			});

			it('getType() return the correct credit card type', function(){
				expect(creditCard.getType()).to.equal('visa');
			});

			it('getExpirationDate() return the correct expiration date', function(){
				expect(creditCard.getExpirationDate()).to.equal('10/2020');
			});

			it('getExpirationMonth() return the correct expiration month', function(){
				expect(creditCard.getExpirationMonth()).to.equal('10');
			});

			it('getExpirationYear() return the correct expiration year', function(){
				expect(creditCard.getExpirationYear()).to.equal('2020');
			});

		});

		describe('Helper methods', function(){

			it('getConfig(key) return the correct value', function(){
				var obj = {'key': 'value'};
				creditCard.addConfig('test_key', obj);
				expect(creditCard.getConfig('test_key')).to.deep.equal(obj);
			});

		});
	});
});

