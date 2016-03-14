var LocalStrategy = require('passport-local').Strategy;
var mongoose = require( 'mongoose' );
var Auth = mongoose.model( 'Auth' );
require('../db');

module.exports = function(passport){
	
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});
	
	passport.deserializeUser(function(id, done){
		Auth.findById(id, function(err, user){
			done(err, user);
		});
	});
	
	passport.use('signup', new LocalStrategy({
		usernameField: 'user_name',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, user_name, password, done){
		process.nextTick(function(){
			Auth.findOne({'user_name': user_name}, function(err, user){
				if(err)
					return done(err);
				if(user){
					return done(null, false, req.flash('signupMessage', 'That Administrator Already Exist'));
					
				}else{
					var newUser = new Auth();
					newUser.user_name = user_name;
					newUser.password = newUser.generateHash(password);
					
					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}));
	
	passport.use('login', new LocalStrategy({
		usernameField: 'user_name',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, user_name, password, done){
		process.nextTick(function(){
			Auth.findOne({'user_name': user_name}, function(err, user){
				if(err)
					return done(err);
				if(!user)
					return done(null, false, req.flash('loginMessage', 'No Administrator Found'));
				if(!user.validPassword(password)){
					return done(null, false, req.flash('loginMessage', 'Invalid Password'));
				}
				return done(null, user);
			});
		});
	}));
	
}