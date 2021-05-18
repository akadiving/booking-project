const Doctor = require('../../mongoDb/models/doctor');
const User = require('../../mongoDb/models/user');



const findByEmailIfExists = async (email) => {

    const user = await User.findOne({ email : email });
    const doctor = await Doctor.findOne({ email : email });


   if(user){
       return user
   }

   if(doctor){
       return doctor
   }

   return null;
}

module.exports = { findByEmailIfExists }