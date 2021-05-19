var userConnectionObj = require('./userConnection.js');
var connectionDB = require('./connectionDB.js');
var connection = require('./connection.js');
 
module.exports = class userProfile{  //this class is for creating a user profile object
  constructor(userId, connectionslist){
    this.userID=userId;
    this.userConnection=connectionslist;
  }

  // getters and setters methods for  user profile class

  getConnectionsList(){
    return this.userConnection;
  }
  setConnectionsList(conList){
    this.userConnection = conList;
  }
  get getUserID(){
  return this.userID;
}
}
