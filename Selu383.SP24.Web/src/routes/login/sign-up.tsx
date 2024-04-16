import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import Footer from "../../elements/footer.tsx";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value);
    const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            if (response.ok) {
                //Redirect them to home page
                console.log('Account created successfully');
            } else {
                // Handle errors, such as displaying validation errors or generic error messages
                console.error('Failed to create account');
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error creating account:', error);
        }
    };

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
                    <center><h1>Account Creation</h1></center>

                    <Form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail" className="mb-3 w-75">
                            <Form.Label><strong>Email address</strong></Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={username} onChange={handleEmailChange} />
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
                    zIndex: 0
                }}></div>
            </div>


        </>
    );
};

export default SignUp;
