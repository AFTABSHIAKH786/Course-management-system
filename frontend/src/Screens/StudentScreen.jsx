import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const StudentScreen = () => {
     
    const [users, setUsers] = useState([])
    useEffect(() => {
        async function userData() {
          const { data } = await axios.get('http://localhost:5000/api/getstudentdata')
          setUsers(data);
        }
        userData();
      }, []);
    

      const deleteUser = async (id) => {
        const { data } = await axios.delete(`http://localhost:5000/api/deletestudent/${id}`)
        if (data) {
          alert('Data deleted')
          window.location.href = '/student'
        }
        else {
          alert('Data not deleted')
        }
      }
      
  return (
    <div className='student'>
      <h1>Edit Student </h1>
      <Table striped bordered hover variant="dark" responsive >
        <thead>
          <tr>
            <th>_id</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Roll no.</th>
            <th>SPID</th>
            <th>ABCID</th>
            <th>Program</th>
            <th>Semester</th>
            <th>Enrolled Course</th>
            <th>WhatsApp no.</th>
            <th>Fees Paid?</th>
            <th><i className="fa-sharp fa-solid fa-pen-to-square"></i> Edit</th>
            <th><i className="fa-sharp fa-solid fa-trash"></i> Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => (
              <tr>
                <td>{user._id}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.rollno}</td>
                <td>{user.spid}</td>
                <td>{user.abcid}</td>
                <td>{user.program}</td>
                <td>{user.semester}</td>
                <td>{user.course}</td>
                <td>{user.whatsapp}</td>
                <td>{user.feespaid}</td>
                <td><Link to={`/editstudent/${user._id}`}><Button variant='light'><i className="fa-sharp fa-solid fa-pen-to-square"></i></Button></Link></td>
                <td><Button onClick={() => deleteUser(user._id)} variant='danger'><i className="fa-sharp fa-solid fa-trash"></i></Button></td>
              </tr>
            ))
          }
        </tbody>
      </Table>
       
    </div>
  )
}

export default StudentScreen
