/* Module dependencies.
*/
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
//var methodOverride = require('method-override');
var app = express();
var mysql      = require('mysql');
var session = require('express-session');


app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true,
  resave: true,
  saveUninitialized: true
}));



var bodyParser=require("body-parser");
var fileupload = require("express-fileupload");
var connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : '',
              database : 'test'
            });
 
connection.connect();
 
global.db = connection;
 
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/style',  express.static(__dirname + '/style'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(fileUpload());
// app.use(fileUpload({
  // limits: { fileSize: '52428800' },
// }));
//Middleware
app.listen(8080);


app.get('/', routes.index);//call for main index page
//app.get('/login', routes.index);//call for login page
app.get('/signup', user.signup);//call for signup page

app.post('/login', user.login);//call for login post
app.post('/signup', user.signup);//call for signup post

//app.get('/dashboard', user.dashboard);//call for dashboard page after login

app.get('/dashboard', user.dashboard);//call for dashboard page after login
app.get('/courses', user.courses);//call for courses page
app.post('/courses', user.courses);//call for courses page
app.get('/viewCourse/:id', user.viewCourse);//call for courses page

app.get('/create', user.create);//call for create course
app.post('/create', user.create);//call for create course post
app.get('/edit_course/:id', user.edit_course);//call for create course
app.post('/edit_course/:id', user.edit_course);//call for create course post

app.get('/edit_chapter/:id', user.edit_chapter);//call for create course
app.post('/edit_chapter/:id', user.edit_chapter);//call for create course post

app.post('/viewCourse/:id', user.viewCourse);
app.get('/profile/',user.profile);//to render users profile
app.get('/quiz', user.quiz);//call for quiz page
app.post('/quiz', user.quiz);//call for quiz page
app.get('/quizzes', user.quizzes);//call for quiz page
app.post('/quizzes', user.quizzes);//call for quiz page
app.get('/createQuiz', user.createQuiz);//call for create course
app.post('/createQuiz', user.createQuiz);//call for create course post
app.get('/viewQuiz/:id', user.viewQuiz);//call for courses page
app.post('/viewQuiz/:id', user.viewQuiz);
app.get('/edit_quiz/:id', user.edit_quiz);//call for create course
app.post('/edit_quiz/:id', user.edit_quiz);//call for create course post
app.get('/edit_question/:id', user.edit_question);//call for create course
app.post('/edit_question/:id', user.edit_question);//call for create course post

// to delete quiz question
app.post('/delete_question/:id', user.delete_question);



// student panel
app.get('/home', user.home);//call for dashboard page after login
app.get('/myprofile/',user.myprofile);//to render users profile
app.get('/viewDetails/:id', user.viewDetails);//call for courses page
app.post('/viewDetails/:id', user.viewDetails);
app.post('/postans', user.postans);
app.get('/postans', user.postans);

app.post('/viewResult', user.viewResult);
app.get('/viewResult', user.viewResult);
app.post('/endpoint', function(req, res){
	var obj = {};
	console.log('body: ' + JSON.stringify(req.body));
	res.send(req.body);
});

//end student panel

app.get('/logout',user.logout);