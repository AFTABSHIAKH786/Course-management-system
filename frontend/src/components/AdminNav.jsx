import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'

import { LinkContainer } from 'react-router-bootstrap'
import jwtDecode from 'jwt-decode'
const AdminNav = (props) => {
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
                                <LinkContainer to='/'>
                                    <Nav.Link>
                                        <div className="nav-item">
                                            <i className="fa-solid fa-book"></i> Dashboard
                                        </div>
                                    </Nav.Link>
                                </LinkContainer>


                                <LinkContainer to="">
                                    <Nav.Link>
                                        <div className="nav-item">
                                            <i className="fa-solid fa-user"></i>
                                            &nbsp; {username}
                                        </div>
                                    </Nav.Link>
                                </LinkContainer>



                                <NavDropdown title={logintype} variant='dark' id='adminmenu'>

                                </NavDropdown>


                            </Nav>
                        </Container>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default AdminNav
