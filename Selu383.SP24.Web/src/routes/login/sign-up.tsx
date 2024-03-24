import { useState } from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import Footer from "../../elements/footer.tsx";
import lawn from "../../assets/chairs_with_grass.jpg";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement your form submission logic here
    };

    return (
        <>
            <div style={{
                backgroundColor: 'rgba(33,31,32,1)', // Black background
                height: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative" // Position relative for stacking elements
            }}>
                <div className="ouline-1" style={{
                    backgroundColor: 'rgba(200,200,200,.65)',
                    width: "80%",
                    padding: "20px",
                    minHeight: "60vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    position: "relative", // Position relative to allow stacking
                    zIndex: 1 // Ensure the grey box appears above the black background
                }}>
                    <center><h1>Account Creation</h1></center>

                    <Form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail" className="mb-3 w-75">
                            <Form.Label><strong>Email address</strong></Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mb-3 w-75">
                            <Form.Label><strong>Password</strong></Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicFirstName" className="mb-3 w-75">
                            <Form.Label><strong>First Name</strong></Form.Label>
                            <Form.Control type="text" placeholder="Enter first name" value={firstName} onChange={handleFirstNameChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicLastName" className="mb-3 w-75">
                            <Form.Label><strong>Last Name</strong></Form.Label>
                            <Form.Control type="text" placeholder="Enter last name" value={lastName} onChange={handleLastNameChange} />
                        </Form.Group>

                        <Button variant="secondary" className="w-25 background-1" type="submit">Create Account</Button>
                        <Link to="/login">
                            <Button variant="danger" className="w-150 mt-3">Cancel</Button>
                        </Link>
                    </Form>
                </div>

                {/* Black background */}
                <div style={{
                    backgroundColor: 'rgba(33,31,32,1)',
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 0 // Ensure the black background is behind the grey box
                }}></div>
            </div>

            <Footer />
        </>
    );
};

export default SignUp;
