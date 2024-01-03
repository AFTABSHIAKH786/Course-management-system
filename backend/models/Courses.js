const mongoose = require('mongoose')

const courses = new mongoose.Schema({
    name:{type:String, required: true},
    description:{type:String, required: true},
    assignment:{type: String},
}, {collection: "courses"})

const model = mongoose.model("Courses_model", courses)

module.exports = model