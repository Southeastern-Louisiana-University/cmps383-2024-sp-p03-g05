import { useEffect } from 'react';
import { Button, Form } from "react-bootstrap";
import Footer from "../../elements/footer.tsx";
import lawn from "../../assets/chairs_with_grass.jpg";
import { Link } from 'react-router-dom';

const SignUp = () => {
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
        <h1 className="text-center mb-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.65)", padding: "20px", borderRadius: "10px", width: "80%" }}>Account Creation</h1>
        
        <div style={{ backgroundColor: "rgba(255, 255, 255, 0.65)", padding: "20px", borderRadius: "10px", width: "80%" }}>
          <Form>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label><strong>Email address</strong></Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label><strong>Password</strong></Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group controlId="formBasicFirstName" className="mb-3">
              <Form.Label><strong>First Name</strong></Form.Label>
              <Form.Control type="text" placeholder="Enter first name" />
            </Form.Group>

            <Form.Group controlId="formBasicLastName" className="mb-3">
              <Form.Label><strong>Last Name</strong></Form.Label>
              <Form.Control type="text" placeholder="Enter last name" />
            </Form.Group>

            <Button variant="secondary" className="w-100 background-1">Create Account</Button>
            <Link to="/login">
              <Button variant="danger" className="w-100 mt-3 btn-sm">Cancel</Button>
            </Link>
          </Form>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default SignUp;
