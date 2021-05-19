module.exports = class userConnection {   //this class is for creating a user connections objects
  constructor(connection, rsvp) {
    this.connection=connection;
    this.rsvp=rsvp;
  }

  // getters and setters methods for  user connection class

  get getConnection(){
    return this.connection;
  }
  set setConnection(connection){
    this.connection = connection;
  }

  get getRSVP(){
    return this.rsvp;
  }
  set setRSVP(rsvp){
    this.rsvp = rsvp;
  }
}
