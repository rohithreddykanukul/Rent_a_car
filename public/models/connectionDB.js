var dbCreation=require("../DB/dbCreation");

var connectionModel=dbCreation.connectionModel;
var connection = require('./connection');

module.exports = class ConnectionDB {


  async getConnections(){   // this method is used to get all the connections in data base
    try{
      return new Promise(async (resolve, reject) => {
        connectionModel.find({}, function (err, connectionsList) {
          if(err) {
            console.error(err);
            reject('Could not find user details');
          } else{
            resolve(connectionsList);
          }
        })
      })
    } catch(err){
      console.error(err);
    }
  }

  async getConnection(connectionId){   // this method is used to get the connection details with connection ID
    try{
        return new Promise(async (resolve, reject) => {
          connectionModel.find({connectionID: connectionId}, function (err, connectionDB) {
            if(err)
            {
              console.error(err);
              reject('Could not find user details');
            }
            else
            {
              if(connectionDB.length>0)
              {
                resolve(new connection(connectionDB[0].connectionID, connectionDB[0].connectionName, connectionDB[0].topic, connectionDB[0].details, connectionDB[0].dateandTime, connectionDB[0].car));
              }
              else
              {
                resolve(new connection());
              }
            }
          })
         });
      } catch(err){
      console.error(err);
    }
  }

  async getCategories(){  //this method is used to get the categories list from the database
    try{
        var connectionsList = await this.getConnections();
        var topics = [];
        connectionsList.forEach(function(item){
        if(!topics.includes(item.topic)){
        topics.push(item.topic);
         }
     });
     return topics;
    } catch(err){
      console.error(err);
    }

  }



  async saveConnection(userId, connection){ //this method is to save a connection to user profile
    try{
      await this.createOrUpdateConnection(userId, connection);
    } catch(err){
      console.error(err);
    }
  }

  /* create new connection or update existing connecction  */
  async createOrUpdateConnection(userId, connection){
    return new Promise(async (resolve, reject) => {
      new connectionModel(
        {userID: userId, connectionID: connection.getConnectionId, connectionName: connection.getConnection_name,
          topic: connection.getTopic, details: connection.getDetails, dateandTime: connection.getDateAndTime,
           car: connection.getCar}).save(function (err, data) {
            if(err){
              console.error(err);
              reject('Couldn\'t save connection');
            } else{
              resolve(data);
            }
        })
    });
  }


  async getNewSequenceNumber(){ // To insert new connection ID I am considering last connection ID fro Incrementing
    try{
      return new Promise(async (resolve, reject) => {
        connectionModel.find({}, {connectionID:1}, function (err, data) {
          if(err){
            console.error(err);
            reject('Couldn\'t find sequence number');
          }
           else
          {
            if(data.length!=0){
              resolve(data[0].connectionID+1);
            }
             else
             {
              resolve(1001);
            }
          }
        }).sort({connectionID:-1}).limit(1);
      });
    } catch(err){
      console.error(err);
    }
  }

 }
