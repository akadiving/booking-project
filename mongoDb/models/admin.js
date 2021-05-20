const mongoose = require('../connect');


const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    booking: Array,
    occupation: String
})

adminSchema.set('toJSON', {
transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
    }
});



module.exports = mongoose.model('Admin', adminSchema)