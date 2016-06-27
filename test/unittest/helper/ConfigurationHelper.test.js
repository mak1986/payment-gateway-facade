(function(){
	'use strict';

	var chai = require('chai');
	var expect = chai.expect;
	var ConfigurationHelper = require('../../../lib/helper/ConfigurationHelper');

	describe('ConfigurationHelper', function(){
			
		var configurationHelper = new ConfigurationHelper();

		describe('Throw exceptions', function(){

			describe('get()', function(){
			
				it('should throw exception when getting a non existing config', function(){			

					expect(function(){

						configurationHelper.get('xyz');

					}).to.throw(configurationHelper.ConfigurationHelperException);

				});

			});

		});

		describe('Public methods', function(){

			describe('get(...keys)', function(){

				it('get(\'key\') return the key value', function(){

					configurationHelper.set('test_key', 'test_value');

					expect(configurationHelper.get('test_key')).to.equal('test_value');

				});

				it('get(\'key_1\', \'key_2\') return the key2 value', function(){

					var obj = {'key_1':{
							'key_2':'key_2_value'
						}
					};

					configurationHelper.set('key_1', obj['key_1']);

					expect(configurationHelper.get('key_1', 'key_2')).to.equal('key_2_value');

				});

			});

		});

		
	});

}());
