var express=require('express');
var app=express();
var session = require('express-session');
//app.use(session({secret: "secretID"}));

app.use(session({
  name: 'session',
  secret: 'rocky',
  keys: ['key1', 'key2'],
    secure: true,
    httpOnly: true,
}));
app.set('view engine','ejs');
app.use('/assets',express.static('assets'));
var helmet = require('helmet');
app.use(helmet());

var controller = require('./routes/controller');
var userController= require('./routes/userController');

app.use('/',controller);
app.use('/',userController)


app.listen(8085,function(){
  console.log("listening to 8085 port")
});
