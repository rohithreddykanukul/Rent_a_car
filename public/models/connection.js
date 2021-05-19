
module.exports= class connect{    // this class is used for creating the connection object
  constructor(connectionID, connectionName, topic, details, dateandTime,car){
    this.connectionID = connectionID;
    this.connectionName = connectionName;
    this.topic = topic;
    this.details = details;
    this.dateandTime = dateandTime;
    this.car = car;

  }

  // getters and setters for connection object
  get getConnectionId(){
    return this.connectionID;
  }
  set setConnectionId(connectionID){
    this.connectionID = connectionID;
  }
  get getConnection_name(){
    return this.connectionName;
  }
  set setConnection_name(connectionName){
    this.connectionName = connectionName;
  }
  get getTopic(){
    return this.topic;
  }
  set setTopic(topic){
    this.topic=topic;
  }
  get getDetails(){
    return this.details;
  }
  set setDetails(details){
    this.details=details;
  }
  get getDateAndTime(){
    return this.dateandTime;
  }
  set setDateAndTime(dateandTime){
    this.dateandTime = dateandTime;
  }
  get getCar(){
    return this.car;
  }
  set setCar(car){
    this.car = car;
  }
}
