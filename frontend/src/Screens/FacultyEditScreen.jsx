import React from 'react'
import {  useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
const FacultyEditScreen = () => {
  
  const defaultValue = {
    name: '',
    email: '',
    logintype: '',
    course: '',
  }
  const navigate = useNavigate();
  const { id } = useParams();
  const [ user, setUser ] = useState(defaultValue)
  const onvalueChange = (e) => {
    setUser({ ...user,[e.target.name]: e.target.value })
  }
  useEffect(()=> {
    async function userData(){
        const { data } = await axios.get(`http://localhost:5000/api/getfaculty/${id}`)
        setUser(data);  
    }
    userData();
  }, []);

  const edituserdata = async () => {
        const { data } =  await axios.post(`http://localhost:5000/api/editfaculty/${id}`, user);
      if(data){
        alert("data updated")
        navigate('/department')
      }
      else{
        alert("lafda ho gaya")
      }
  }

  return (
    <div className='container login_fix'>
      <h1>Edit Faculty/Admin</h1>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" onChange={(e) => onvalueChange(e)} name='name' value={user.name} />
        <label htmlFor="floatingInput">Name</label>
      </div>
      <div className="form-floating mb-3">
        <input type="email" className="form-control" onChange={(e) => onvalueChange(e)} name='email' value={user.email} />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <select id="login_type" name='logintype' value={user.logintype} onChange={(e) => onvalueChange(e)}>
                <option value="">Select Role</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Admin</option>
            </select>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" onChange={(e) => onvalueChange(e)} name='course' value={user.course} />
        <label htmlFor="floatingInput">Course</label>
      </div>
      <button type="button" className="enter_course btn btn-dark" onClick={edituserdata}>Save Changes</button>
    </div>
  )
}

export default FacultyEditScreen
