import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


export default function NavigationBar() {
    return (
        <>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container >
          <Navbar.Brand className='header-text' href="/">EnStay</Navbar.Brand>
          <Nav className="me-auto " >
            <Nav.Link className='header-text' href="/">Home</Nav.Link>
            <Nav.Link className='header-text' href="/hotels">Browse Hotels</Nav.Link>
            <Nav.Link className='header-text' href="/appointments">Make an Appointment</Nav.Link>
          </Nav>
          <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          <Nav.Link className='header-text' href="/login">SignUp / Login</Nav.Link>
          </Navbar.Text>
        </Navbar.Collapse>
        </Container>
      </Navbar>
        </>
    );
}
