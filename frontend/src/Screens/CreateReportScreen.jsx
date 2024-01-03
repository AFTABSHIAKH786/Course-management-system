import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
const CreateReportScreen = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  if (token) {
    const user = jwtDecode(token)
    var coursename = user.course
  }
  const defaultValue = {
    name: '',
    email: '',
  }
  
  const { id } = useParams();
  const [ user, setUser ] = useState(defaultValue)
  const onvalueChange = (e) => {
    setUser({ ...user,[e.target.name]: e.target.value })
  }
  useEffect(()=> {
    async function userData(){
        const { data } = await axios.get(`http://localhost:5000/api/getstudent/${id}`)
        setUser(data);  
    }
    userData();
  }, []);

  const name = user.fullname
  const email = user.email
  const [assig, setAssig] = useState('')
  const [marks, setMarks] = useState('')
  const [counts , setCount ] = useState('')

  async function getCount() {
      const { data } = await axios.get(`http://localhost:5000/api/${email}`);
      const value = data[0]
      setCount(value.count)
  }
  getCount();

  async function createReport() {
    const response = await fetch('http://localhost:5000/faculty/createreport', {
      headers: {
        'Content-Type': 'application/json',
    },
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      coursename,
      assig,
      marks,
      counts
        })
    })
    const data = await response.json()
        console.log(data)
        if(data.status ==="ok"){
          alert('Report Created!')
            navigate("/faculty/studentreport")
        }
        else {
            alert("Report Creation failed!")
        }
  }
  return (
    <div className='container report_create'>
      <h1>Create Report</h1>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" onChange={(e) => onvalueChange(e)} name='name' value={user.fullname}/>
        <label htmlFor="floatingInput">Name</label>
      </div>
      <div className="form-floating mb-3">
        <input type="email" className="form-control" onChange={(e) => onvalueChange(e)} name='email' value={user.email}/>
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating mb-3">
        <input type="email" className="form-control" value={coursename}/>
        <label htmlFor="floatingInput">Course Name</label>
      </div>
      <select id="login_type" name='logintype' value={assig} onChange={(e) => {
        setAssig(e.target.value)
      }} >
        <option value="">Assignment Submitted</option>
        <option value='yes'>Yes</option>
        <option value='no'>No</option>
      </select>
      <div className="form-floating mb-3">
        <input type="email" className="form-control" placeholder='Marks Obtained in test' value={marks} onChange={(e) => {
          setMarks(e.target.value)
        }}/>
        <label htmlFor="floatingInput">Marks Obtained in test</label>
      </div>
      <div className="attendance"><p className='item' align='center'>Attendance:- <span className='item1'>{counts}</span></p> </div>
      <button type="button" className="enter_course btn btn-dark" onClick={createReport}>Create Report</button>
    </div>
  )
}

export default CreateReportScreen
