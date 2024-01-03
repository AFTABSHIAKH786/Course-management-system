import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
const CourseStudentScreen = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const user = jwtDecode(token)
    var coursename = user.course
  }
    const [students, setStudents] = useState([])
    useEffect(() => {
      async function userData() {
        const { data } = await axios.get(`http://localhost:5000/api/coursestudent/${coursename}`)
        setStudents(data);
      }
      userData();
    }, []);
  return (
    <div className='container report_screen'>
      <Table striped bordered hover variant="dark" responsive >
          <thead>
            <tr>
              <th>_id</th>
              <th>Student Name</th>
              <th>Roll No</th>
              <th>Email</th>
              <th>Contact No.</th>
              <th>Create Report</th>
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
                  <td>{student.whatsapp}</td>
                  <td><Link to={`/report/${student._id}`}><button className='report_button'>Create Report</button></Link></td>
                </tr>
              ) )
            }
          </tbody>
        </Table>
    </div>
  )
}

export default CourseStudentScreen
