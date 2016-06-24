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

				'5019717010103742': 'Dankort',
				'5019406374903422': 'Dankort',
				'5019900585151193': 'Dankort',
				'5019368125765494': 'Dankort',
				'5019993236537688': 'Dankort',

				'36609256124161': 'Diners Club',
				'36566190972222': 'Diners Club',
				'36086721096904': 'Diners Club',
				'36664134599589': 'Diners Club',
				'36531618084232': 'Diners Club',

				'6011894492395579': 'Discover',
				'6011388644154687': 'Discover',
				'6011880085013612': 'Discover',
				'6011652795433988': 'Discover',
				'6011375973328347': 'Discover',

				// Can't find dummy data 
				// all wrong...
				// '6382202830221328': 'Interpayment',
				// '6390424403698936': 'Interpayment',
				// '6393764237597839': 'Interpayment',
				// '6360105459898603': 'Interpayment',
				// '6395842439103149': 'Interpayment',

				'3528000700000000': 'JCB',
				'3528742003071820': 'JCB',
				'3530111333300000': 'JCB',
				'3528660919460756': 'JCB',
				'3528386850001470': 'JCB',

				// wrong
				// '8800000000000000': 'Unionpay',

				'6759791704494743': 'Maestro',
				'5038258240124858': 'Maestro',
				'6304088784149911': 'Maestro',
				'6762292975333962': 'Maestro',
				'5893959649352693': 'Maestro',

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

				'4175005276323755': 'Visa Electron',
				'4844569226417554': 'Visa Electron',
				'4026887060261031': 'Visa Electron',
				'4913684229769186': 'Visa Electron',
				'4913443799866439': 'Visa Electron'
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

