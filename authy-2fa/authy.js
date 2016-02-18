var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    authy = require('authy')('TCqJ00PIpZgA7pJODrO9aL9re7mQpYWE');

app.use(bodyParser.json());       						//to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));    	//to support URL-encoded bodies 

//route: send authy SMS message with verification code
app.post('/sms', function(req, res){
    var uid = req.body.uid;
    
    authy.request_sms(uid, function (err, response){
        //expected response:
        //{ success: true,
        //  message: 'SMS token was sent',
        //  cellphone: '+1-XX12362760' }
        res.send(response);
    });
});

//route: verify a provided verification token against a given user
app.post('/verify', function(req, res){
    var uid = req.body.uid;
    var token = req.body.token;
    
    authy.verify(uid, token, function (err, response){
        //expected response:
        //{ message: 'Token is valid.',
        //  token: 'is valid',
        //  success: 'true' }
        res.send(response);
    });
});

//route: register a new user via provided email and phone number
app.post('/register', function(req, res){
    var email = req.body.email;
    var number = req.body.number;
    
    authy.register_user(email, number, function (err, response){
        //expected response:
        //{ message: 'User created successfully.',
        //  user: { id: 16782433 },
        //  success: true }
        res.send(response);
    }); 
});

//route: delete an existing user
app.post('/delete', function(req, res){
    var uid = req.body.uid;
    authy.delete_user(uid, function (err, response){
        res.send(response);
        //expected response: 
        //{ message: 'User was added to remove.', success: true }
    });
});

app.listen(process.env.PORT || 3000);
