const express = require('express');
const path = require('path');
const multer = require('multer');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash =  require('connect-flash');
const passport = require('passport');
const bodyParser = require('body-parser');

require('dotenv').config({path: 'variables.env'});


// Initializations
const app = express();
//require('./database');
require('./config/passport');

// Settings
app.set('views', path.join(__dirname, './views'));
app.engine('.hbs', exphbs({
	defaultLayout: 'main', 
	layoutsDir: path.join(app.get('views'), 'layouts'),
	extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
	secret: 'mysecretapp',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//app.use(multer({dest: path.join(__dirname, './public/uploads/componentes')}).single('image'));	//Aqui es donde se subira la imagen
app.use(multer({dest:'./public/uploads/componentes'}).single('image'));


// Global Variables
app.use((req, res, next) => 
{
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

//Conectar Mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, 
{
	useNewUrlParser: true
})

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

//Routes
app.use(require('./routes/componentes.js'));
app.use(require('./routes/users.js'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server is listenning
app.listen(port, host, () => 
{
	console.log("Server on port");
});