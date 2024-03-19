import { useEffect } from 'react';
import { Button, Form } from "react-bootstrap";
import Footer from "../../elements/footer.tsx";
import lawn from "../../assets/chairs_with_grass.jpg";
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
      <div
        style={{
          backgroundImage: `url(${lawn})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "20px",
          marginBottom: "0px", // No margin to the bottom
        }}
      >
        <h1 className="text-center mb-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.65)", padding: "20px", borderRadius: "10px", width: "80%" }}>Let's Get you back in Paradise</h1>
        
        <div style={{ backgroundColor: "rgba(255, 255, 255, 0.65)", padding: "20px", borderRadius: "10px", width: "60%" }}> {/* Adjusted the width of the colored background */}
          <Form>
            <Form.Group controlId="inputUsername" className="mb-3 text-center"> {/* Centering the username field */}
              <Form.Label><strong>Username / Email</strong></Form.Label>
              <Form.Control type="text" placeholder="Enter username or email" style={{ width: "50%", margin: "auto" }} /> {/* Making the username field smaller and centered */}
            </Form.Group>

            <Form.Group controlId="inputPassword" className="mb-3 text-center"> {/* Centering the password field */}
              <Form.Label><strong>Password</strong></Form.Label>
              <Form.Control type="password" placeholder="Password" style={{ width: "50%", margin: "auto" }} /> {/* Making the password field smaller and centered */}
            </Form.Group>

            <Button variant="secondary" className="w-100 background-1" style={{ width: "50%", margin: "auto" }}>Let's Get Booking</Button> {/* Making the button smaller and centered */}
          </Form>
        </div>

        <div style={{ backgroundColor: "rgba(255, 255, 255, 0.65)", padding: "20px", borderRadius: "10px", width: "60%", marginTop: "20px" }}> {/* Adjusted the width of the colored background */}
          <center>
            <h1> First Time? </h1>
            <Link to={"./signup"}>
              <Button variant="secondary" className="w-100 background-1" style={{ width: "50%", margin: "auto" }}>Sign Up Here</Button> {/* Making the button smaller and centered */}
            </Link>
          </center>
        </div>
        <Footer />
      </div>
    </>
  );
}
