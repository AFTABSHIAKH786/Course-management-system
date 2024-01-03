import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const LoginScreen = () => {
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('') 
    const [logintype, setLogintype] = useState('')
    async function LoginUser(event) {
        event.preventDefault()
        if(logintype == "student"){
            const response = await fetch('http://localhost:5000/api/login',{
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                logintype
            })
        })
        const data = await response.json()
        console.log(data)
        if(data.user){
                localStorage.setItem('token',data.user)
                window.alert('Login Sucess')
                window.location.href = "/dashboard";
            }
            else{
                alert("Login Failed Check Email and Password")
            }
        }
        else if(logintype=="admin"){
            const response = await fetch('http://localhost:5000/api/login/admin',{
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify({
                    email,
                    password,
                    logintype
                })
            })
            const data = await response.json()
            console.log(data)
            if(data.admin){
                localStorage.setItem('token',data.admin)
                    window.alert('Login Sucess')
                    window.location.href = "/dashboard";
                }
                else{
                    alert("Login Failed Check Email and Password")
                }
        }
        else{
            const response = await fetch('http://localhost:5000/api/login/faculty',{
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                logintype
            })
        })
        const data = await response.json()
        console.log(data)
        if(data.faculty){
            localStorage.setItem('token',data.faculty)
                window.alert('Login Sucess')
                window.location.href = "/dashboard";
            }
            else{
                alert("Login Failed Check Email and Password")
            }
        }
    }
    return (
        <div className='container login_fix'>
            <form onSubmit={LoginUser}>
            <h1 className="login_page_heading">
                Login
            </h1>
            <div className="form-floating mb-3">
                <input type="email" className="form-control" value={email} onChange={
                    (e)=> {
                        setEmail(e.target.value)
                    }
                } placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" value={password} onChange={(e)=> {
                    setPassword(e.target.value)
                }} placeholder="Password"/>
                    <label htmlFor="floatingPassword">Password</label>
            </div>
            
            <p className='newlogin'>Register new student :-
            <Link className='enter_course reg_btn' to={'/register'}>New Student</Link>
            </p>
            <input type="submit" value="Login" className="enter_course login_button btn btn-light" />
            </form>
        </div>
    )
}

export default LoginScreen
