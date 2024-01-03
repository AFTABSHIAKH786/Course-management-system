import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AddAdmin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logintype, setLogintype] = useState('');
   
    const [name, setName] = useState('');

    const [course, setCourse] = useState('');
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function userData() {
          const { data } = await axios.get('http://localhost:5000/api/getCourses')
          setCourses(data);
        }
        userData();
      }, []);
    async function addAdmin() {
        const response = await fetch('http://localhost:5000/api/addAdmin',{
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                password,
                logintype,
                course
            })
        })  
        const data = await response.json()
        console.log(data)
        if(data){
            alert("User Added sucessfully");
            navigate('/department')
        }
        else{
            alert("Failed to add user!!!")
        }
    }
  return (
      <div className="container courses">
            <h1 className="login_page_heading">
                Add Admin / Faculty
            </h1>
            <div className="form-floating">
                <input type="text" className="form-control" value={name} onChange={(e)=> {
                    setName(e.target.value)
                }} placeholder="Password"/>
                    <label htmlFor="floatingPassword">Name</label>
            </div>
            <div className="form-floating mb-3">
                <input type="email" className="form-control" value={email} onChange={
                    (e)=> {
                        setEmail(e.target.value)
                    }
                } placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" value={password} onChange={(e)=> {
                    setPassword(e.target.value)
                }} placeholder="Password"/>
                    <label htmlFor="floatingPassword">Password</label>
            </div>
            <select value={logintype} onChange={(e)=> {
                setLogintype(e.target.value)
            }}  id="login_type">
                <option value="">Select Login Type</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Admin</option>
            </select>
            <select name="courses" value={course} onChange={(e) => {
                            setCourse(e.target.value)
                        }}> 
                            <option>Select Credit Course</option>
                          {
                            courses.map( course => (
                                <option value={course.name}> {course.name} </option>
                            ))
                          }  
                            
                        </select>
            <button type="button" className="enter_course btn btn-dark" onClick={addAdmin}>Add Adimin / Faculty</button>   
        </div>
    
  )
}

export default AddAdmin
