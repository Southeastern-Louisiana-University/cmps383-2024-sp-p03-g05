import { useEffect } from 'react';
import { Button, Form } from "react-bootstrap";
import Footer from "../../elements/footer.tsx";
import { Link } from "react-router-dom";

export default function Login() {
  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <div style={{
        backgroundColor: 'rgba(33,31,32,1)',
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
      }}>
        <div className="ouline-1" style={{
          backgroundColor: 'rgba(200,200,200,.65)',
          width: "80%",
          padding: "20px",
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          zIndex: 1
        }}>
          <h1 className="text-center mb-4">Let's Get you back in Paradise</h1>
          
          <Form className="text-center">
            <Form.Group controlId="inputUsername" className="mb-3">
              <Form.Label><strong>Username / Email</strong></Form.Label>
              <Form.Control type="text" placeholder="Enter username or email" style={{ width: "50%", margin: "auto" }} />
            </Form.Group>

            <Form.Group controlId="inputPassword" className="mb-3">
              <Form.Label><strong>Password</strong></Form.Label>
              <Form.Control type="password" placeholder="Password" style={{ width: "50%", margin: "auto" }} />
            </Form.Group>

            <Button variant="secondary" className="background-1" style={{ width: "50%", margin: "auto" }}>Let's Get Booking</Button>
          </Form>

          <h1 className="text-center mt-4">First Time?</h1>
          <Link to={"./signup"} className="text-center">
            <Button variant="secondary" className="background-1" style={{ width: "50%", margin: "auto" }}>Sign Up Here</Button>
          </Link>
        </div>
        
        {/* Black background */}
        <div style={{
          backgroundColor: 'rgba(33,31,32,1)',
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0
        }}></div>
      </div>
      <Footer />
    </>
  );
}
