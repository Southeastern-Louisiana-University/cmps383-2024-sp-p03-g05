import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import AuthContext from "../features/authentication/AuthContext";
import { useContext, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavigationBar() {
  const authContext = useContext(AuthContext);
  function logout(){
    fetch("/api/authentication/logout",{ method: 'POST'})
    authContext?.setUser(null)
  }
  if (authContext?.user != null) {
    return (
      <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container >
            <Navbar.Brand className='header-text' href="/">EnStay</Navbar.Brand>
            <Nav className="me-auto " >
              
              <Nav.Link><Link className='header-text' to={"/"}>Home </Link></Nav.Link>
              <Nav.Link><Link className='header-text' to={"/hotels"}>Browse Hotels </Link></Nav.Link>
              <Nav.Link><Link className='header-text' to={""}>My Reservations </Link></Nav.Link>

            </Nav>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
            <NavDropdown className='header-text' title={"Hello, " + authContext.user.firstName} id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Nav.Link className='header-text' href="/login">My Account</Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link className='header-text' onClick={logout}>Logout</Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>
              

            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
    
  } else {
    return (
      <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container >
            <Navbar.Brand className='header-text' href="/">EnStay</Navbar.Brand>
            <Nav className="me-auto " >
              <Nav.Link><Link className='header-text' to={"/"}>Home </Link></Nav.Link>
              <Nav.Link><Link className='header-text' to={"/hotels"}>Browse Hotels </Link></Nav.Link>

            </Nav>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className='header-text'>
              <Nav.Link><Link className='header-text' to={"/login"}>SignUp / Login </Link></Nav.Link>              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }


}
