import React from 'react'
import { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Faculty = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([])
  useEffect(() => {
    async function userData() {
      const { data } = await axios.get('http://localhost:5000/api/getfacultydata')
      setUsers(data);
    }
    userData();
  }, []);
  const deleteUser = async (id) => {
    const { data } = await axios.delete(`http://localhost:5000/api/deletefaculty/${id}`)
    if (data) {
      alert('Data deleted')
      window.location.href = '/department'
    }
    else {
      alert('Data not deleted')
    }
  }

  return (
    <div className='container department'>

      <h1>Department </h1>
       <Link to={'/addadmin'}>
        <div className="enter_course btn btn-dark">
        <i class="fa-sharp fa-solid fa-address-card"></i> Add User
        </div>
      </Link>
      <Table striped bordered hover variant="dark" responsive >
        <thead>
          <tr>
            <th>_id</th>
            <th>Faculty Name</th>
            <th>Course</th>
            <th>Role</th>
            <th><i className="fa-sharp fa-solid fa-pen-to-square"></i> Edit</th>
            <th><i className="fa-sharp fa-solid fa-trash"></i> Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => (
              <tr>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.course}</td>
                <td>{user.logintype}</td>
                <td><Link to={`/editfaculty/${user._id}`}><Button variant='light'><i className="fa-sharp fa-solid fa-pen-to-square"></i></Button></Link></td>
                <td><Button onClick={() => deleteUser(user._id)} variant='danger'><i className="fa-sharp fa-solid fa-trash"></i></Button></td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Faculty
