const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const admin = new mongoose.Schema({
    name:{type:String, required: true},
    password:{type:String, required: true},
    email:{type: String, required: true, unique: true},
    logintype: {type:String, required: true},
    course: {type: String}
}, {collection: "admin_faculty"})

const model = mongoose.model("Admin_model", admin)

module.exports = model