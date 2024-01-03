import React from 'react'
import { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const CoursesScreen = () => {

  const navigate = useNavigate();
  const [users, setUsers] = useState([])
  useEffect(() => {
    async function userData() {
      const { data } = await axios.get('http://localhost:5000/api/getCourses')
      setUsers(data);
    }
    userData();
  }, []);
  console.log(users)
  const deleteCourse = async (id) => {
    const { data } = await axios.delete(`http://localhost:5000/api/deletecourse/${id}`)
    if (data) {
      alert('Data deleted')
      window.location.href = '/courses'
    }
    else {
      alert('Data not deleted')
    }
  }

  return (
    <div className='container'>
      <h1>Courses </h1>
       <Link to={'/addcourse'}>
        <div className="enter_course btn btn-dark">
        <i class="fa-sharp fa-solid fa-address-card"></i> Add Courses
        </div>
      </Link>
      <Table striped bordered hover variant="dark" responsive >
        <thead>
          <tr>
            <th>_id</th>
            <th>Course Name</th>
            <th>Description</th>
            <th>Assignment</th>
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
                <td>{user.description}</td>
                <td><a href={user.assignment} target='_blank'>{user.assignment}</a></td>
                <td><Link to={`/editCourses/${user._id}`}><Button variant='light'><i className="fa-sharp fa-solid fa-pen-to-square"></i></Button></Link></td>
                <td><Button onClick={() => deleteCourse(user._id)} variant='danger'><i className="fa-sharp fa-solid fa-trash"></i></Button></td>
              </tr>
            ))
          }
        </tbody>
      </Table>

    </div>
  )
}

export default CoursesScreen
