(function(){
	'use strict';
	

	// Constructor method

	function ConfigurationHelper() {

		this.config = {};
	
	}
	

	// Public methods

	ConfigurationHelper.prototype.setDefaultConfig = function(dirPath){

		var config = require(dirPath + '/config/config.json');
		var key;
		
		for(key in config){
			this.set(key, config[key]);
		}

	};

	ConfigurationHelper.prototype.set = function(key, value){

		this.config[key] = value;
	
	};

	ConfigurationHelper.prototype.get = function(...keys){

		var i, value;

		for(i = 0; i < keys.length; i++){

			if(i === 0){
				
				value = this.config[keys[i]];
							
			}else{
			
				value = value[keys[i]];
			
			}
		
		}

		if(value){
			return value;
		}else{
			throw new ConfigurationHelper('Non existing key');
		}
	
	};

	module.exports = ConfigurationHelper;

}());