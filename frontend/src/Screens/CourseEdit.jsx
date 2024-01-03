import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
const CourseEdit = () => {

  const defaultValue = {
    name: '',
    description: '',
    assignment: '',
  }
  const navigate = useNavigate();
  const { id } = useParams();
  const [ user, setUser ] = useState(defaultValue)
  const onvalueChange = (e) => {
    setUser({ ...user,[e.target.name]: e.target.value })
  }
  useEffect(()=> {
    async function userData(){
        const { data } = await axios.get(`http://localhost:5000/api/getCourse/${id}`)
        setUser(data);  
    }
    userData();
  }, []);

  const editCourses = async () => {
        const { data } =  await axios.post(`http://localhost:5000/api/editCourse/${id}`, user);
      if(data){
        alert("data updated")
        navigate('/courses')
      }
      else{
        alert("lafda ho gaya")
      }
  }

  return (
    <div className='container courses'>
      <form>
      <h1>Edit Courses</h1>
      <div className="form-floating mb-3">
                <input type="text" className="form-control" name="name" value={user.name} onChange={(e) => onvalueChange(e)}  placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">Course Title</label>
            </div>
            <label for="exampleFormControlTextarea1">Course Description</label>
            <textarea class="form-control" name='description' value={user.description} 
            onChange={(e) => onvalueChange(e)} id="exampleFormControlTextarea1"
             rows="3"></textarea>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" name='assignment' value={user.assignment} onChange={(e) => onvalueChange(e)}  placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">Assignment (Google Form Link)</label>
            </div>
            <button type="button" className="enter_course btn btn-dark" onClick={editCourses}>Save Changes</button>
      </form>
    </div>
  )
}

export default CourseEdit
