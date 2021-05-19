var dbCreation=require("./dbCreation");

var userModel=dbCreation.userModel;

module.exports = class UserInfo{

  async getUsers(userID){  // gets the user docuemnt with userID
    try{
      return new Promise(async (resolve, reject) => {
        userModel.find({userID:userID}, function (err, usersList) {
          if(err)
           {
            console.error(err);
            reject('Could not find user details');
           }
           else
           {
            resolve(usersList);
           }
        })
      });
    } catch (err){
      console.error(err);
    }
  }

  async getUser(userId,password){    //This method is used for validating the user login
    try{
      return new Promise(async (resolve, reject) => {
        userModel.find({userID:userId,password:password}, function (err, userDetails) {
          if(err) {
            console.error(err);
            reject('Could not find user details');
          } else{
            resolve(userDetails);
          }
        })
      });
    } catch(err){
      console.error(err);
    }
  }


async checkUser(username){   // This method is used whether usename exists while creating a new user

  try{
    return new Promise(async (resolve, reject) => {
      userModel.find({userID:username}).countDocuments(function(err,count){
        if(err)
         {
          console.error(err);
          reject('Could not find user details');
         }
         else
         {
           resolve(count);
         }
      });
    });
  }
  catch(err){
    console.error(err);
  }
}

async saveUsertoDB(user){    // This method is used to save the new user after all validations done
  try{
  return new Promise(async (resolve, reject) => {
    new userModel(
      {userID:user.getuserID,
        firstname:user.getfirstname,
        lastname:user.getlastname,
        email_address:user.getemail_address,
        addressfield1:user.getaddressfield1,
        addressfield2:user.getaddressfield2,
        city:user.getcity,
        state:user.getstate,
        zipCode:user.getzipcode,
        country:user.getcountry,
        password:user.getPassword,
        salt:user.getSalt})
        .save(function (err, data) {
          if (err) {console.error(err);
            reject('Could not save user');
          } else {
            resolve(data);
          }
        });
      });
    }
    catch(err){
      console.error(err);
    }
}



async getUserSalt(userId){     // this method is used to check the password enter by an existing user
  try{
    return new Promise(async (resolve, reject) => {
      userModel.find({userID:userId},function(err,data){
        if(err)
         {
          console.error(err);
          reject('Could not find data');
         }
         else
         {
           resolve(data);
         }
      });
  
    })
  }
  catch(err){
    console.error(err);
  }
}

}