import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const AddCourseScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [assignment, setAssignment] = useState('')
  async function addCourse() {
    const response = await fetch('http://localhost:5000/api/addCourses', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify({
        name,
        desc,
        assignment
      })
    })
    const data = await response.json()
    console.log(data)
    if (data) {
      alert("Course Added sucessfully");
      navigate('/courses')
    }
    else {
      alert("Failed to add Course!!!")
    }
  }
  return (
    <div className='container courses'>
      <form>
        <h1>Add Courses</h1>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" value={name} onChange={(e) => {
            setName(e.target.value)
          }} placeholder="name@example.com" />
          <label htmlFor="floatingInput">Course Title</label>
        </div>
        <label for="exampleFormControlTextarea1">Course Description</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" value={desc} onChange={(e)=> {
                    setDesc(e.target.value)
                }}  rows="3"></textarea>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" value={assignment} onChange={(e) => {
            setAssignment(e.target.value)
          }} placeholder="name@example.com" />
          <label htmlFor="floatingInput">Assignment Link (Google Form)</label>
        </div>
        <button type="button" className="enter_course btn btn-dark" onClick={addCourse}>Create Course
        </button>
      </form>
    </div>
  )
}

export default AddCourseScreen
