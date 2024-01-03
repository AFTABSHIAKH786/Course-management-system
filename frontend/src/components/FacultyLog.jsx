import jwtDecode from 'jwt-decode';
import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
const FacultyLog = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const user = jwtDecode(token)
    var coursename = user.course
  }
  var today = new Date();
  const [students, setStudents] = useState([])
  useEffect(() => {
    async function userData() {
      const { data } = await axios.get(`http://localhost:5000/api/coursestudent/${coursename}`)
      setStudents(data);
    }
    userData();
  }, []);

  const [start , setStart] = useState('')
  const [end , setEnd] = useState('')
  const [present, setPresent] = useState([])
  const handlePresent = (e) => {
    const value = e.target.value
    const checked = e.target.checked
    if(checked){
      setPresent([
        ...present, value
      ])
    }
    else{
      setPresent(present.filter( (e) => (e !== value) ))
    }
  }
  console.log(present)

  const submitLog = async () => {
    const response = await fetch('http://localhost:5000/api/faculty_log', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        start,
        end,
        coursename,
        today,
        present
      })
    })
    const data = await response.json()
    if(data){
      alert('Log Added Sucessfully!!')
      window.location.href = '/attendance'
    }
  }

  return (
    <div className='container faculty_log'>
      <h1>Enter Attendance</h1>
      <div className="row">
        <div className="col">
          <div className="form-floating mb-4">
            <input type="time" className="form-control" placeholder="full name as per marksheet" value={start} onChange={(e) => setStart(e.target.value)} />
            <label htmlFor="floatingInput" >Start of the Class</label>
          </div>
          <div className="form-floating mb-4">
            <input type="text" value={today} className="form-control" placeholder="full name as per marksheet" />
            <label htmlFor="floatingInput">Todays date</label>
          </div>
        </div>
        <div className="col">
          <div className="form-floating mb-4">
            <input type="time" className="form-control" placeholder="full name as per marksheet" value={end} onChange={(e) => setEnd(e.target.value)} />
            <label htmlFor="floatingInput">End of the Class</label>
          </div>
        </div>
        <div className="col">
          <div className="form-floating mb-4">
            <input type="text" className="form-control" value={coursename} placeholder="full name as per marksheet" />
            <label htmlFor="floatingInput">Course Name</label>
          </div>
        </div>
        <div className="col">
          <button className="enter_course faculty_log_submit_btn" onClick={submitLog}>Submit Log</button>
        </div>
      </div>
      <div>
        <Table striped bordered hover variant="dark" responsive >
          <thead>
            <tr>
              <th>_id</th>
              <th>Student Name</th>
              <th>Roll No</th>
              <th>Email</th>
              <th><i className="fa-sharp fa-solid fa-hand"></i> Present</th>
            </tr>
          </thead>
          <tbody>
            {
              students.map( student => (
                <tr>
                  <td>{student._id}</td>
                  <td>{student.fullname}</td>
                  <td>{student.rollno}</td>
                  <td>{student.email}</td>
                  <td><Form.Check aria-label="option 1" value={student.email} 
                    onChange={handlePresent}
                  /></td>
                </tr>
              ) )
            }
          </tbody>
        </Table>
      </div>

    </div>
  )
}

export default FacultyLog
