const mongoose = require('mongoose')

const Attendance = new mongoose.Schema({
    class_start: {type:String, required: true},
    class_end: {type:String, required: true},
    class_name: {type:String, required: true},
    date: {type: String, required: true},
    present:[{type:String, required:true}]
},
{
    timestamps: true
}, {collection: "faculty_log"})

const model = mongoose.model("Attendance_model", Attendance)

module.exports = model