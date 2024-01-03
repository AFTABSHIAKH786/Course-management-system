const mongoose = require("mongoose")

const User = new mongoose.Schema( {
    fullname : {type: String, required: true},
    email : {type: String, required: true, unique: true},
    password: {type: String, required: true},
    rollno: {type: Number, required: true},
    spid: {type: Number, required:true},
    abcid: {type: String, required: true},
    program: {type: String, required: true},
    semester: {type: String, required: true},
    whatsapp: {type: String, required: true},
    feespaid: {type: String, required: true},
    course: {type: String, required: true}
}, {collection: "student-data"})

const model = mongoose.model('UserData', User)

module.exports = model