import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'

import { LinkContainer } from 'react-router-bootstrap'
import jwtDecode from 'jwt-decode'
const NavigationBar = () => {
    const data = {
        "fullname":" ",
        "email":" ",
        "role":" ",
        "course":" "
    }
    console.log(data)
    const token = localStorage.getItem('token')
    const user = jwtDecode(token)
    var logintype = user.role
    var username = user.fullname
    if (logintype == "admin") {
        logintype = "Admin"
    }
    else if (logintype == 'faculty') {
        logintype = "Faculty"
    }
    else {
        logintype = "Student"
    }
    function logout() {
        alert('Confirm Logout')
        window.location.href = '/'
    }

    return (
        <div>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect >
                <Container className='py-3'>
                    <LinkContainer to='/'>
                        <Navbar.Brand>CCMS</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Container className='navbar'>
                            <Nav className='ml-auto'>
                                <LinkContainer to='/dashboard'>
                                    <Nav.Link>
                                        <div className="nav-item">
                                            <i className="fa-solid fa-book"></i> Dashboard
                                        </div>
                                    </Nav.Link>
                                </LinkContainer>
                            
                                        <div className="nav-item">
                                            <i className="fa-solid fa-user"></i>  
                                            &nbsp; {username}
                                        </div>
                                    
                                
                               
                                    {
                                            (logintype=='Admin')
                                            ?
                                            (
                                                <NavDropdown title={logintype} variant='dark' id='adminmenu'>
                                                    <LinkContainer to='/department'>
        <NavDropdown.Item>Faculty</NavDropdown.Item>
      </LinkContainer>
      <LinkContainer to='/student'>
        <NavDropdown.Item>Student</NavDropdown.Item>
      </LinkContainer>
      <LinkContainer to='/courses'>
        <NavDropdown.Item>Courses</NavDropdown.Item>
      </LinkContainer>
      <LinkContainer to='/studentreport'>
        <NavDropdown.Item>Student Reports</NavDropdown.Item>
      </LinkContainer>
      <LinkContainer to='/Logout'>
        <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
      </LinkContainer>
                                                </NavDropdown>
                                            ) :
                                            (logintype=='Faculty')
                                            ?
                                            (
                                                <NavDropdown title={logintype} variant='dark' id='adminmenu'>
                                                    <LinkContainer to='/faculty/studentreport'>
        <NavDropdown.Item>Student Report</NavDropdown.Item>
      </LinkContainer>
      <LinkContainer to='/faculty/student'>
        <NavDropdown.Item>Student Enrolled</NavDropdown.Item>
      </LinkContainer>
      <LinkContainer to='/attendance'>
        <NavDropdown.Item>Enter Log</NavDropdown.Item>
      </LinkContainer>
      <LinkContainer to='/Logout'>
        <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
      </LinkContainer>
                                                </NavDropdown>
                                            )
                                            :
                                            (
                                                <NavDropdown title={logintype} variant='dark' id='adminmenu'>
                                            
      <LinkContainer to='/singlestudentreport'>
        <NavDropdown.Item>Student Report</NavDropdown.Item>
      </LinkContainer>
      <LinkContainer to='/Logout'>
        <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
      </LinkContainer>
                                                </NavDropdown>
                                            )
                                    
                                    }
                                    
                            </Nav>
                        </Container>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavigationBar
