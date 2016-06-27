/*jshint loopfunc: true */
/*jshint -W004 */
(function(){
	'use strict';

	// Require necessary files
	
	var ConfigurationHelper = require('../../helper/ConfigurationHelper');

	
	// Constructor method

	function CreditCard(properties) {

		// set configurations
		this.config = new ConfigurationHelper();
		this.config.setDefaultConfig(__dirname);
		
		// Set credit card holder name, first name and last name
		this.setHolderName(properties['credit_card_holder_name']);

		// Set credit card number and credit card type
		this.setNumber(properties['credit_card_number']);

		// set credit card cvv
		this.setCvv(properties['credit_card_cvv']);

		// set credit card expiration date, expiration month and expiration year
		this.setExpirationDate(properties['credit_card_expiration_date']);

	}

	// Exception

	CreditCard.prototype.CreditCardException = function(message){

		this.message = message;
		this.name = "CreditCardException";
	
	};

	// Private methods

	//ref: https://gist.github.com/DiegoSalazar/4075533
	// takes the form field value and returns true on valid number
	function validCreditCard(value) {
	  // accept only digits, dashes or spaces
		if (/[^0-9-\s]+/.test(value)) return false;

		// The Luhn Algorithm. It's so pretty.
		var nCheck = 0, nDigit = 0, bEven = false;
		value = value.replace(/\D/g, "");

		for (var n = value.length - 1; n >= 0; n--) {
			var cDigit = value.charAt(n),
				  nDigit = parseInt(cDigit, 10);

			if (bEven) {
				if ((nDigit *= 2) > 9) nDigit -= 9;
			}

			nCheck += nDigit;
			bEven = !bEven;
		}

		return (nCheck % 10) === 0;
	}

	// Public methods 
	
	CreditCard.prototype.detectType = function(number){

		for(let index = 0; index < this.config.get('detect_order').length; ++index){	
			
			let key = this.config.get('detect_order')[index];	
			
			if(new RegExp(this.config.get('credit_card_types', key, 'regex'), 'i').test(number)){
			
				return this.config.get('credit_card_types', key, 'machine_name');
			
			}
		
		}
		
		throw new this.CreditCardException('Credit card number is invalid.');
	
	};

	
	// Set methods

	CreditCard.prototype.setHolderName = function(holderName){
		
		var tempNameArray = holderName.split(" ");
		
		// Weak validation
		if(tempNameArray.length == 2){		
			
			this.holderName = holderName;
			this.firstName = tempNameArray[0];
			this.lastName = tempNameArray[1];
	
		}else{
	
			throw new this.CreditCardException('First name or last name is missing.');
	
		}
	
	};

	CreditCard.prototype.setNumber = function(number){
		
		if(!validCreditCard(number)){
		
			throw new this.CreditCardException('Invalid credit card number.');
		
		}

		this.type = this.detectType(number);
		this.number = number;
	
	};
	
	CreditCard.prototype.setCvv = function(cvv){
		
		// Weak validation
		if(cvv.length == 3 || cvv.length == 4){
		
			this.cvv = cvv;
		
		}else{

			throw new this.CreditCardException('CVV Number (Card Verification Value) is invalid.');

		}

	};

	CreditCard.prototype.setExpirationDate = function(expirationDate){
		
		var tempExpirationDateArray = expirationDate.split('/');
		
		// Weak validation
		if(tempExpirationDateArray.length == 2 && 
			(tempExpirationDateArray[0].length == 2 || tempExpirationDateArray[0].length == 1)&& 
			tempExpirationDateArray[1].length == 4 && 
			parseInt(tempExpirationDateArray[0]) &&
			parseInt(tempExpirationDateArray[1])){

			this.expirationDate = expirationDate;
			this.expirationMonth= tempExpirationDateArray[0];
			this.expirationYear = tempExpirationDateArray[1];

		}else{

			throw new this.CreditCardException('Credit card expiration must be formatted (mm/yyyy).');

		}

	};


	// Get methods

	CreditCard.prototype.getHolderName = function(){

		return this.holderName;

	};

	CreditCard.prototype.getFirstName = function(){

		return this.firstName;

	};

	CreditCard.prototype.getLastName = function(){

		return this.lastName;

	};

	CreditCard.prototype.getNumber = function(){

		return this.number;

	};

	CreditCard.prototype.getCvv = function(){

		return this.cvv;

	};

	CreditCard.prototype.getType = function(){

		return this.type;

	};

	CreditCard.prototype.getExpirationDate = function(){

		return this.expirationDate;

	};

	CreditCard.prototype.getExpirationMonth = function(){

		return this.expirationMonth;

	};

	CreditCard.prototype.getExpirationYear = function(){

		return this.expirationYear;

	};

	module.exports = CreditCard;

}());