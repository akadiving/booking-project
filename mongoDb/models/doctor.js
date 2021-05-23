const mongoose = require('../connect');


const doctorSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    booking: Array,
    occupation: String,
    workTime: Array
})

doctorSchema.set('toJSON', {
transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    }
});



module.exports = mongoose.model('Doctor', doctorSchema)