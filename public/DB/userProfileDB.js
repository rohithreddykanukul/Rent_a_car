var dbCreation=require("./dbCreation");

var userConnectionsModel = dbCreation.userConnectionsModel;

var connectionDB = require('./../models/connectionDB');
var userProfileClass = require('./../models/userProfile');
var userConnection = require('./../models/userConnection');
var connection = require('./../models/connection');

module.exports = class userProfileDB {


  async addRSVP(userId, conn, rsvp){   // this method is used to check whether the rsvp is updated or newly added 
    try{
      var response = await this.addNewConnToUser(userId, conn, rsvp);
      if(response.nModified == 0){
        response = await this.updateRSVP(userId, conn, rsvp);
        if(response.nModified == 0){
          response = await this.addNewUserProfile(userId, conn, rsvp);
        }
      }
    } catch(err){
      console.error(err);
    }
  }

  async updateRSVP(userId, conn, rsvp){  // This method is used to update an rsvp to a saved connection 
    try{
      return new Promise(async (resolve, reject) => {
        userConnectionsModel.updateOne({userID:userId, "userConnection.connectionID":conn.getConnectionId},
        {$set:{"userConnection.$.rsvp":rsvp}}, function(err, data){
          if(err){ 
            console.error(err);
            reject('-----------');
          } else{
            resolve(data);
          }
        })
      });
    } catch(err){
      console.error(err);
    }
  }

  async removeConnection(userId, conn){   // This method is to delete a user connection from saved connections
    try{
      return new Promise(async (resolve, reject) => {
        userConnectionsModel.updateOne({userID:userId},
        {$pull:{userConnection:{connectionID:conn.getConnectionId}}}, function(err, data){
          if(err){
            console.error(err);
            reject('-----------');
          } else{
            resolve(data);
          }
        })
      })
    } catch(err){
      console.error(err);
    }
  }


  /* creating New userProfile    */
  async addNewUserProfile(userId, conn, rsvp){
    return new Promise(async (resolve, reject) => {
       userConnectionsModel({userID:userId, userConnection:[{connectionID:conn.getConnectionId, rsvp: rsvp}]}).save(function(err, data){
        if(err){
          console.error(err);
          reject('-----------');
        } else{
          resolve(data);
        }
      })
    });
}


  /* Adding connection to user  */
  async addNewConnToUser(userId, conn, rsvp){
    return new Promise(async (resolve, reject) => {
      userConnectionsModel.updateOne({userID:userId, "userConnection.connectionID": {$ne: conn.getConnectionId}},
        {$push:{userConnection:{connectionID:conn.getConnectionId, rsvp: rsvp}}}, function(err, data){
          if(err){
            console.error(err);
            reject('-----------');
          } else{
            resolve(data);
          }
        })
    });
  }

  /* Updaing existing connection rsvp*/
  async updateExistingConn(userId, conn, rsvp){
    return new Promise(async (resolve, reject) => {
      userConnectionsModel.updateOne({userID:userId, "userConnection.connectionID":conn.getConnectionId},
      {$set:{"userConnection.$.rsvp":rsvp}}, function(err, data){
        if(err){
          console.error(err);
          reject('-----------');
        } else{
          resolve(data);
        }
      })
    });
  }

  /* Removing a connection from user profile*/
  async removeConnFromUserProfile(userId, conn){
    return new Promise(async (resolve, reject) => {
      userConnectionsModel.updateOne({userID:userId},
      {$pull:{userConnection:{connectionID:conn.getConnectionId}}}, function(err, data){
        if(err){
          console.error(err);
          reject('-----------');
        } else{
          resolve(data);
        }
      })
    })
  }

  async getUserProfile(userId){   // this method is used to get the use profile connections with userID as a parameter
    try{
      return new Promise(async (resolve, reject) => {
        userConnectionsModel.find({userID:userId},{userConnection:1}, function(err, data){
          if(err){
            console.error(err);
            reject('Couldn\'t get user profile');
          } else{
            resolve(data);
          }
        })
      });
    } catch(err){
      error.console(err);
    }
  }

  async stubbingToProfileClass(userId){     // this method is used to convert the user connection list to user profile class list
  var connectionDBObj = new connectionDB();
  var list = await this.getUserProfile(userId);
  let userConnectionList = new Array();
  if(list.length>0){
    let userConList = list[0].userConnection;
    for(var i=0; i<userConList.length;i++){
      var con = await connectionDBObj.getConnection(userConList[i].connectionID);
      userConnectionList.push(new userConnection(new connection(con.connectionID, con.connectionName, con.topic, con.details, con.dateandTime, con.car),userConList[i].rsvp));
    }
  }
  return new userProfileClass(userId, userConnectionList);
}

}
