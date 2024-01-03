const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const User = require('./models/User')
const Admin = require('./models/Admin')
const Courses = require('./models/Courses')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Attendance = require('./models/Attendance')
const Report = require('./models/Report')

//mongoDB connection variable
mongoose.connect('mongodb+srv://admin:admin@cluster0.itb5pkc.mongodb.net/ccms')

//connection between two servers
app.use(cors())
app.use(express.json())

//student registeration api 
app.post('/api/register', async (req,res) => {
    console.log(req.body)
    const newPassword = await bcrypt.hash(req.body.password, 10)
    try {
        await User.create({
            fullname: req.body.fullname,
            email: req.body.email,
            password: newPassword,
            rollno: req.body.rollno,
            program: req.body.program,
            abcid: req.body.abcid,
            semester: req.body.semester,
            spid: req.body.spid,
            whatsapp: req.body.whatsapp,
            feespaid: req.body.feespaid,
            course: req.body.course
        })
        res.json({ status: "ok", User:true})
        
    } catch (err) { 
        console.log(err)
        res.json({status: "error", error:"User Not Registered"})
    }
})

//student login api 
app.post('/api/login', async (req,res) => {
    const logintype = req.body.logintype 
    console.log(logintype)
        console.log(req.body)
        const user =  await User.findOne({
              email: req.body.email
          })
          if (user) {
            try{
                bcrypt.compare(req.body.password, user.password)
            }catch(e){
                res.json('error')
            }
              const token = jwt.sign({
                  fullname: user.fullname,
                  email: user.email,
                  role: req.body.logintype,
                  course: user.course
              }, 'secret123')
              return res.json({ status: "ok", user: token})
          }else{
            return res.json("error")
          }
})

//admin login api
app.post('/api/login/admin', async (req,res) => {
    const logintype = req.body.logintype 
    console.log(logintype)
        const admin =  await Admin.findOne({
              email: req.body.email,
          })
          if (admin) {
            try{
                bcrypt.compare(req.body.password, admin.password)
            }catch(e){
                res.json('error')
            }
              const token = jwt.sign({
                  fullname: admin.name,
                  email: admin.email,
                  role: admin.logintype,
                  course: admin.course
              }, 'secret123')
              return res.json({ status: "ok", admin: token})
          }else{
            return res.json({status: 400, admin: false})
          }
})

//faculty login api
app.post('/api/login/faculty', async (req,res) => {
    const logintype = req.body.logintype 
    console.log(logintype)
        const faculty =  await Admin.findOne({
              email: req.body.email,
          })
          if (faculty) {
            try{
                bcrypt.compare(req.body.password, faculty.password)
            }catch(e){
                res.json('error')
            }
              const token = jwt.sign({
                  fullname: faculty.name,
                  email: faculty.email,
                  role: faculty.logintype,
                  course: faculty.course
              }, 'secret123')
              return res.json({ status: "ok", faculty: token})
          }else{
            return res.json({status: 400, faculty: false})
          }
})

//user logout api
app.post('/api/logout', (req, res) => {
    localStorage.removeItem('token');
    return res.json({status: 400, message:"no user exist"})
})

//register admin api
app.post('/api/addAdmin', async (req, res) =>{
    console.log(req.body)
    const newPassword = await bcrypt.hash(req.body.password, 10)
    try{
        await Admin.create({
            name : req.body.name,
            email: req.body.email,
            password: newPassword,
            logintype: req.body.logintype,
            course: req.body.course
        })
        res.json({status: "ok", Admin:true})
    } catch(e) {
        console.log(e);
        res.json({status: "error", Admin: false})
    }
})

//get faculty data api

app.get('/api/getfacultydata', async (req, res) => {
        try{
            const udata = await Admin.find({})
            res.json(udata)
        } 
        catch (e){
            res.json({status: 404, error: "data not found"})
        }
})

//get single faculty/admin data

app.get('/api/getfaculty/:id', async (req, res) => {
    try{
        const udata = await Admin.findById(req.params.id);
        res.json(udata)
    } 
    catch (e){
        res.json({status: 404, error: "data not found"})
    }
})

//updating single faculty/admin data 
app.post('/api/editfaculty/:id', async (req, res)=> {
    let user =  req.body;
    const edituser = new Admin(user);

    try{
        await Admin.updateOne({ _id: req.params.id}, edituser)
        return res.status(200).json(edituser)
    }
    catch(e) {
        return res.status(444).json({message : e.message})
    }
})

//updating single student data
app.post('/api/editstudent/:id', async (req, res)=> {
    let user =  req.body;
    const edituser = new User(user);

    try{
        await User.updateOne({ _id: req.params.id}, edituser)
        return res.status(200).json(edituser)
    }
    catch(e) {
        return res.status(444).json({message : e.message})
    }
})

// deleting single faculty/admin
app.delete('/api/deletefaculty/:id', async (req, res) => {
    try{
        await Admin.deleteOne({_id: req.params.id})
        return res.status(200).json({message: "deleted"})
    }
    catch(e) {
        return res.status(411).json({message: e.message})
    }
})

//deleting single student 
app.delete('/api/deletestudent/:id', async (req, res) => {
    try{
        await User.deleteOne({_id: req.params.id})
        return res.status(200).json({message: "deleted"})
    }
    catch(e) {
        return res.status(411).json({message: e.message})
    }
})

//get student data api
app.get('/api/getstudentdata', async (req, res)=> {
    try{
        const udata = await User.find({})
        res.json(udata)
    } 
    catch (e){
        res.json({status: 404, error: "data not found"})
    }
})

//get single student data
app.get('/api/getstudent/:id', async (req, res) => {
    try{
        const udata = await User.findById(req.params.id);
        res.json(udata)
    } 
    catch (e){
        res.json({status: 404, error: "data not found"})
    }
})

//add courses api
app.post('/api/addCourses', async (req, res) =>{
    console.log(req.body)
    try{
        await Courses.create({
            name : req.body.name,
            description: req.body.desc,
            assignment: req.body.assignment,
        })
        res.json({status: "ok", Courses:true})
    } catch(e) {
        console.log(e);
        res.json({status: "error", Courses: false})
    }
})

//get courses data
app.get('/api/getCourses', async (req, res) => {
    try{
        const udata = await Courses.find({})
        res.json(udata)
    } 
    catch (e){
        res.json({status: 404, error: "data not found"})
    }
})

//get single course detail by id
app.get('/api/getCourse/:id', async (req, res) => {
    try{
        const udata = await Courses.findById(req.params.id);
        res.json(udata)
    } 
    catch (e){
        res.json({status: 404, error: "data not found"})
    }
})

//get single course detail by course name
app.get('/api/getCoursedetail/:name', async (req, res) => {
    const coursename = req.params.name
    try{
        const udata = await Courses.find({name : coursename});
        res.json(udata)
    } 
    catch (e){
        res.json({status: 404, error: "data not found"})
    }
})

//updating course data 
app.post('/api/editCourse/:id', async (req, res)=> {
    let user =  req.body;
    const edituser = new Courses(user);
    try{
        await Courses.updateOne({ _id: req.params.id}, edituser)
        return res.status(200).json(edituser)
    }
    catch(e) {
        return res.status(444).json({message : e.message})
    }
})

//delete course 
app.delete('/api/deletecourse/:id', async (req, res) => {
    try{
        await Courses.deleteOne({_id: req.params.id})
        return res.status(200).json({message: "deleted"})
    }
    catch(e) {
        return res.status(411).json({message: e.message})
    }
})

//register faculty daily log api
app.post('/api/faculty_log', async (req,res) =>{
    console.log(req.body)
    try{
        await Attendance.create({
            class_start: req.body.start,
            class_end: req.body.end,
            class_name: req.body.coursename,
            date: req.body.today,
            present: req.body.present
        })
        res.json({status: "ok", Attendance:true})
    } catch(e) {
        console.log(e);
        res.json({status: "error", Attendance: false})
    }
})

//get student by course 
app.get('/api/coursestudent/:course', async (req, res)=> {
    const course = req.params.course
    try{
        const students = await User.find({course: course})
        res.json(students)
    }catch(e) {
        res.status(404).json(e, {message:'student not found'})
    }
    
})
//test api
app.get('/api/:email', async (req, res) => {
    const email = req.params.email
    console.log(email)
    const query = await Attendance.aggregate([{$match:{present: email}}, {$group:{_id: null ,count:{$sum:1}}}])
    res.json(query)
})

//create student report api
app.post('/faculty/createreport', async(req, res) => {
    console.log(req.body)
    try{
        await Report.create({
            name : req.body.name,
            email: req.body.email,
            assignment: req.body.assig,
            test: req.body.marks,
            course: req.body.coursename,
            attendance: req.body.counts
        })
        res.json({status: "ok", Report:true})
    } catch(e) {
        console.log(e);
        res.json({status: "error", Report: false})
    }
})

//get student report course wise
app.get('/faculty/studentreport/:course', async (req, res) => {
    const course = req.params.course
    try{
        const report = await Report.find({course:course});
        res.status(200).json(report)
    }catch(e){
        res.status(404).json('Report not found')
    }  
})

//delete stdudent report 
app.post('/api/deletereport/:id', async (req, res) => {
    try{
        await Report.deleteOne({_id: req.params.id})
        return res.status(200).json({message: "deleted"})
    }
    catch(e) {
        return res.status(411).json({message: e.message})
    }
})

//get all student report
app.get('/faculty/studentreport', async (req, res) => {
    try{
        const report = await Report.find();
        res.status(200).json(report)
    }catch(e){
        res.status(404).json('Report not found')
    }  
})

//get single student report 
app.get('/singlestudentreport/:email', async (req, res) => {
    const email = req.params.email
    try{
        const report = await Report.find({email : email});
        res.status(200).json(report)
    }catch(e){
        res.status(404).json('Report not found')
    }  
})

app.listen(5000, console.log('server is running at 5000'))