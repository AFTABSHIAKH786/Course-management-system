import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
const RegistrationScreen = () => {
    const navigate = useNavigate()
    const [fullname, setFullname] = useState('')
    const [rollno, setRollno] = useState('')
    const [spid, setSpid] = useState('')
    const [abcid, setAbcid] = useState('')
    const [program, setProgram] = useState('')
    const [semester, setSemester] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [feespaid, setFeespaid] = useState('')
    const [course, setCourse] = useState('');
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function userData() {
          const { data } = await axios.get('http://localhost:5000/api/getCourses')
          setCourses(data);
        }
        userData();
      }, []);
 
    async function registerUser(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:5000/api/register',{
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                fullname,
                email,
                rollno,
                spid,
                abcid,
                program,
                semester,
                password,
                whatsapp,
                feespaid,
                course
            })
        })
        const data = await response.json()
        console.log(data)
        if(data.status ==="ok"){
            navigate("/")
        }
        else {
            alert("Registration failed")
        }
    }
    return (
        <div className='container regestration'>
            <h1 className="login_page_heading">
                Registration
            </h1>
            <form onSubmit={registerUser}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" value={fullname} onChange={(e) => {
                                setFullname(e.target.value)
                            }
                            } placeholder="full name as per marksheet" />
                            <label htmlFor="floatingInput">Full Name (as per marksheet)</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" value={rollno} onChange={(e) => {
                                setRollno(e.target.value)
                            }} placeholder="roll no" />
                            <label htmlFor="floatingInput">Roll no</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" value={spid} onChange={(e) => {
                                setSpid(e.target.value)
                            }} placeholder="SPID" />
                            <label htmlFor="floatingInput">SPID</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" value={abcid} onChange={(e) => {
                                setAbcid(e.target.value)
                            }} placeholder="ABCID" />
                            <label htmlFor="floatingInput">ABCID</label>
                        </div>
                        <label htmlFor="program">Program</label>
                        <select name="program" value={program} 
                        onChange={(e) => {
                            setProgram(e.target.value)
                        }}> 
                            <option>Select Program</option>
                            <option value="bsc_computer">Bsc (computerscience)</option>
                            <option value="bsc_chemistry">Bsc (chemistry)</option>
                            <option value="bsc_microbiology">Bsc (bsc_microbiology)</option>
                            <option value="bca">BCA</option>
                            <option value="bba">BBA</option>
                        </select>
                        <label htmlFor="semester">Semester</label>
                        <select name="semester" value={semester} onChange={(e) => {
                            setSemester(e.target.value)
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
                                    <input type="email" className="form-control" value={email} onChange={(e) => {
                                        setEmail(e.target.value)
                                    }} placeholder="name@example.com" />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating">
                                    <input type="password" className="form-control" value={password} onChange={(e)=> {
                                        setPassword(e.target.value)
                                    }} placeholder="Password" />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" value={whatsapp} maxLength="10" onChange={(e)=> {
                                        setWhatsapp(e.target.value)
                                    }} placeholder="Whatsapp number" />
                                    <label htmlFor="floatingInput">WhatsApp No.</label>
                                </div>
                                <label htmlFor="feespaid">Fees Paid?</label>
                        <select name="feespaid" value={feespaid} onChange={(e) => {
                            setFeespaid(e.target.value)
                        }}> 
                            <option>Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>

                        <select name="courses" value={course} onChange={(e) => {
                            setCourse(e.target.value)
                        }}> 
                            <option>Select Credit Course</option>
                          {
                            courses.map( course => (
                                <option value={course.name}> {course.name} </option>
                            ))
                          }  
                            
                        </select>
                        
                        <p className='newlogin'>Already a Student?
            <Link className='enter_course reg_btn' to={'/login'}>Login</Link>
            </p>
                            </div>
                        </div>
                    </div>
                    <input type="submit" value="Register" className="enter_course login_button btn btn-light"   />
                </div>
            </div>
            </form>
        </div>
    )
}

export default RegistrationScreen
