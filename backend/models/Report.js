    const mongoose = require('mongoose')

    const report = new mongoose.Schema({
        name:{type:String, required: true},
        email:{type:String, required: true, unique: true},  
        assignment:{type: String ,required: true},
        test:{type:Number ,required: true},
        attendance:{type:Number ,required: true} ,
        course:{type:String ,required: true}
    }, {collection: "Student_report"})

    const model = mongoose.model("Student_report", report)

    module.exports = model