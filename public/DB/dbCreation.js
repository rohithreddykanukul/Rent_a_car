var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/RentACar', {useNewUrlParser: true});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

  var userSchema = new mongoose.Schema({    // user db Schema
    userID : String,
    firstname : String,
    lastname : String,
    email_address : String,
    addressfield1 : String,
    addressfield2 : String,
    city  : String,
    state: String,
    zipcode:Number,
    country: String,
    password: String,
    salt : String

 });
 var connectionsSchema = new mongoose.Schema({ // connections db schema
   userID: String,
   connectionID: Number ,
   connectionName: String ,
   topic: String,
   details: String  ,
   dateandTime: String,
   car: String
});

var userConnectionsSchema = new mongoose.Schema({     //user connections Schema
  userID:String,
  userConnection:[{
    connectionID: Number,
     rsvp: String
   }]
});

var userModel = mongoose.model('users', userSchema);
var connectionModel = mongoose.model('connections', connectionsSchema);
var userConnectionsModel=  mongoose.model('userConnections', userConnectionsSchema);


module.exports.userModel=userModel;
module.exports.connectionModel=connectionModel;
module.exports.userConnectionsModel=userConnectionsModel;
