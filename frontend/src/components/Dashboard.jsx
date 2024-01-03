import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode';

import axios from 'axios'
const Dashboard = () => {

  const token = localStorage.getItem('token');
  if (token) {
    const user = jwtDecode(token)
    var coursename = user.course
    var logintype  = user.role
  }
  const [courses, setCourse] = useState([])
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(`http://localhost:5000/api/getCoursedetail/${coursename}`)
      setCourse(data)
    }
    getData();
  }, [])

  console.log(logintype)
  return (
    <div>
      {
        (logintype == 'admin') ? (
          <h1>Admin all the modules are in the navigation bar</h1>
        ):
        (
          
            courses.map(course => (
              <div className="container dashboard">
                <div className='row justify-content-around'>
                  <div class="col-4">
                    <h1 className="dash">{course.name}</h1>
                    <p className="dash_p">{course.description}</p>
    
                  </div>
                  <div class="col-4">
                    <div className="dash_2"><h3 >Assignment Submission Link</h3>
                </div>
                    {
                      (course.assignment) == '' ? (
                        <h3>No assigment</h3>
                      ): 
                      (
                        <a className='dash_link' href={course.assignment} target='_blank'>Link</a>
                      )
                    }
                  </div>
                </div>
    
              </div>
            ))
          
        )
      }
      
    </div>
  )
}

export default Dashboard
