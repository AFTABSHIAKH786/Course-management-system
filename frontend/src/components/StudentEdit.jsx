import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
const StudentEdit = () => {
    const navigate = useNavigate();
    const defaultValue = {
        fullname: '',
        email: '',
        rollno: 0,
        spid: 0,
        abcid: '',
        program: '',
        semester: '',
        whatsapp: '',
        feespaid: ''
       }
    const { id } = useParams();
    const [ user, setUser ] = useState(defaultValue)
    const onvalueChange = (e) => {
    setUser({ ...user,[e.target.name]: e.target.value })
    console.log(user)
  }
  useEffect(()=> {
    async function userData(){
        const { data } = await axios.get(`http://localhost:5000/api/getstudent/${id}`)
        setUser(data);  
    }
    userData();
  }, []);
  console.log(user)
  const edituserdata = async () => {
    const { data } =  await axios.post(`http://localhost:5000/api/editstudent/${id}`, user);
  if(data){
    alert("data updated")
    navigate('/student')
  }
  else{
    alert("lafda ho gaya")
  }
}

  return (
    <div className='container'>
      <h1>Edit Student</h1>
      <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" placeholder="full name as per marksheet" name='fullname' onChange={(e) => onvalueChange(e)} value={user.fullname} />
                            <label htmlFor="floatingInput">Full Name (as per marksheet)</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control"  placeholder="roll no" name='rollno' value={user.rollno} onChange={(e) => {
                                onvalueChange(e)
                            }} />
                            <label htmlFor="floatingInput">Roll no</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" placeholder="SPID" name='spid' value={user.spid} onChange={(e) => {
                                onvalueChange(e)
                            }} />
                            <label htmlFor="floatingInput">SPID</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control"  placeholder="ABCID" name='abcid' value={user.abcid} onChange={(e) => {
                                onvalueChange(e)
                            }} />
                            <label htmlFor="floatingInput">ABCID</label>
                        </div>
                        <label htmlFor="program">Program</label>
                        <select name="program" value={user.program} onChange={(e) => {
                                onvalueChange(e)
                            }} > 
                            <option>Select Program</option>
                            <option value="bsc_computer">Bsc (computerscience)</option>
                            <option value="bsc_chemistry">Bsc (chemistry)</option>
                            <option value="bsc_microbiology">Bsc (bsc_microbiology)</option>
                            <option value="bca">BCA</option>
                            <option value="bba">BBA</option>
                        </select>
                        <label htmlFor="semester">Semester</label>
                        <select name="semester" value={user.semester} onChange={(e) => {
                                onvalueChange(e)
                            }}>
                            <option>Select Semester</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control"  placeholder="name@example.com" name='email' value={user.email} onChange={(e) => {
                                onvalueChange(e)
                            }} />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" placeholder="Whatsapp number" name='whatsapp' value={user.whatsapp} onChange={(e) => {
                                onvalueChange(e)
                            }} />
                                    <label htmlFor="floatingInput">WhatsApp No.</label>
                                </div>
                                <label htmlFor="feespaid">Fees Paid?</label>
                        <select name="feespaid" value={user.feespaid} onChange={(e) => {
                                onvalueChange(e)
                            }}> 
                            <option>Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        <button type="button" className="enter_course student_edit btn btn-dark" onClick={edituserdata} >Save Changes</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
    </div>
  )
}

export default StudentEdit
