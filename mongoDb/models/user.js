const mongoose = require('../connect');


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    token: String,
    booking: Array
})

userSchema.set('toJSON', {
transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    }
});



module.exports = mongoose.model('User', userSchema)