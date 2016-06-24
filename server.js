var express = require('express');
var bodyParser = require('body-parser');

// Gateway Facade
var gatewayFacade = new (require('./lib/gateway/GatewayFacade'))();

var app = express();

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({'extended':false}));

app.get('/', function(req, res){
	res.render('index');
});

app.get("/client-token/:gatewayName", function (req, res) {
	
	gatewayFacade.use(req.params.gatewayName).getClientToken(function(token){
		res.send(token);
	});

});

app.post("/checkout", function (req, res) {
	
	gatewayFacade.makeSinglePayment(req, function(error, result){
		if(error){
			res.render('index', error);
		}else{
			res.render('index', result);
		}
	});

});

app.listen(3000);