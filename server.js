var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');


// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
	function(username, password, cb) {
		db.users.findByUsername(username, function(err, user) {
			if (err) { return cb(err); }
			if (!user) { return cb(null, false); }
			if (user.password != password) { return cb(null, false); }
			return cb(null, user);
		});
	}));


// Configure Passport authenticated session persistence.
// In order to restore aputhentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
	cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
	db.users.findById(id, function (err, user) {
		if (err) { return cb(err); }
		cb(null, user);
	});
});




// Create a new Express application.
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

//Sending And Receiving Messages from clients
io.on('connection', function(socket){

	socket.on('acijjkll', function(msg){
		socket.broadcast.emit('acijjkll', msg);
	});
	socket.on('aacejjkn', function(msg){
		socket.broadcast.emit('aacejjkn', msg);
	});
	socket.on('achjjkno', function(msg){
		socket.broadcast.emit('achjjkno', msg);
	});
	socket.on('aeijjlln', function(msg){
		socket.broadcast.emit('aeijjlln', msg);
	});
	socket.on('hijjllno', function(msg){
		socket.broadcast.emit('hijjllno', msg);
	});
	socket.on('aehjjnno', function(msg){
		socket.broadcast.emit('aehjjnno', msg);
	});


	socket.on('disconnect', function(){
		socket.broadcast.emit(socket.username,"offline");
	});

});
// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

//Use Static js Files
app.use(express.static('static'));
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes.
app.get('/',
	function(req, res) {
		res.render('home', { user: req.user });
	});

app.get('/login',
	function(req, res){
		res.render('login');
	});

app.post('/login', 
	passport.authenticate('local', { failureRedirect: '/login' }),
	function(req, res) {
		res.redirect('/profile');
		io.on('connection', function(socket){
			socket.username = req.user.username;
			socket.broadcast.emit(req.user.username,"online");
		});
	});

app.get('/logout',
	function(req, res){
		req.logout();
		res.redirect('/');
	});

app.get('/profile',
	require('connect-ensure-login').ensureLoggedIn(),
	function(req, res){
		var array = ['jack','jill','john','jane'];
		var i = array.indexOf(req.user.username);
		console.log(req.user.username);
		if(i != -1) {
			array.splice(i, 1);
		}
		res.render('chat', { user: req.user , total: array});
	});
http.listen(3000);
