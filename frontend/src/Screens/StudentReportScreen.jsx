import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode';
import axios from 'axios'
import { Table, Button } from 'react-bootstrap';
const StudentReportScreen = () => {

    const token = localStorage.getItem('token');
    if (token) {
        const user = jwtDecode(token)
        var coursename = user.course
    }
    const [reports, setReport] = useState([])

    useEffect(() => {
        async function userData() {
          const { data } = await axios.get(`http://localhost:5000/faculty/studentreport/${coursename}`)
          setReport(data);
        }
        userData();
      }, []);

      const deleteCourse = async (id) => {
        const { data } = await axios.post(`http://localhost:5000/api/deletereport/${id}`)
        if (data) {
          alert('Data deleted')
          window.location.href = '/faculty/studentreport'
        }
        else {
          alert('Data not deleted')
        }
      }

    return (
        <div className='container report_screen'>
            <h1>Student Report</h1>
            <Table striped bordered hover variant="dark" responsive >
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Student Name</th>
              <th>Email</th>
              <th>Assignment Submission</th>
              <th>Marks Obtained</th>
              <th><i className="fa-sharp fa-solid fa-trash"></i> Delete</th>
            </tr>
          </thead>
          <tbody>
            {
                reports.map( report => (
                    <tr>
                        <td>{report._id}</td>
                        <td>{report.name}</td>
                        <td>{report.email}</td>
                        <td>{report.assignment}</td>
                        <td>{report.test}</td>
                        <td><Button onClick={() => deleteCourse(report._id)} variant='danger'><i className="fa-sharp fa-solid fa-trash"></i></Button></td>
                    </tr>
                ) )
            }
          </tbody>
        </Table>
        </div>
    )
}

export default StudentReportScreen
