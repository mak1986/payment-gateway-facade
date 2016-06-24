
	$('#loading').hide();
	
	var braintreeClientToken;

	$.get("/client-token/braintree", function( token ) {	
		braintreeClientToken = token;
	});

	
	function submit(){
					
		$('#submit-btn').hide();
		$('#loading').show();
		$('input, select').attr('disabled', true);

		var client = new braintree.api.Client({clientToken: braintreeClientToken});

		client.tokenizeCard({
		
			number: $('#credit-card-number').val(),
		 	cardholderName: $('#credit-card-holder-name').val(),
			expirationDate: $('#credit-card-expiration-date').val(),
			cvv: $('#credit-card-cvv').val()
		
		}, function (err, nonce) {
			console.log(nonce);
			$('<input>').attr({
			    type: 'hidden',
			    id: 'braintree-nonce',
			    name: 'braintree_nonce',
			    value: nonce
			}).appendTo('#checkout-form');

			$('input, select').attr('disabled', false);
			$('#checkout-form').submit();
			$('input, select').attr('disabled', true);
		});
			

	}
