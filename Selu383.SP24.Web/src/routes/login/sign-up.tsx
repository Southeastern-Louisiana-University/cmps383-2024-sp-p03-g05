import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import Footer from "../../elements/footer.tsx";
import AuthContext from "../../features/authentication/AuthContext";
import useFetch from "use-http";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const { loading, post } = useFetch('/api/users/signup', {
        method: "POST",
        onNewData: (_, x) => {
          if (typeof x === "string") {
            setError(x);
          } else if ('id' in x) {
            console.log("we logged in as: ");
            console.log(x);
            authContext?.setUser(x);
            navigate("/");
            // TODO: save in context and redirect to home page
          }
        },
      });

      

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

                    <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 w-75">
                            <Form.Label><strong>Email address</strong></Form.Label>
                            <Form.Control 
                                id="email"
                                type="email" 
                                placeholder="Enter email" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="email"
                                required
                            />
                        </Form.Group>

                        <Form.Group  className="mb-3 w-75">
                            <Form.Label><strong>Password</strong></Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required
                                autoComplete="password"
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicFirstName" className="mb-3 w-75">
                            <Form.Label><strong>First Name</strong></Form.Label>
                            <Form.Control 
                                id="firstName"
                                type="text" 
                                placeholder="Enter first name" 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)} 
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 w-75">
                            <Form.Label><strong>Last Name</strong></Form.Label>
                            <Form.Control 
                                id="lastName"
                                type="text" 
                                placeholder="Enter last name" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)} 

                                required
                                
                            />
                        </Form.Group>
                        <div>
                            {loading ? "Signing Up..." : null}
                                {error ? error : null}
                                </div>
                        <Button 
                            variant="secondary" 
                            className="w-25 background-1" 
                            type="submit"
                            disabled={loading}>
                                
                                Create Account
                        </Button>
                        
                        <Link to="/login">
                            <Button variant="danger" className="w-150 mt-3">Cancel</Button>
                        </Link>
                    </form>
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
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (loading) {
            return;
          }
    
          post({
            userName: username,
            password: password,
            fistName: firstName,
            lastName:lastName,
            email: username
          });
    }
};

export default SignUp;
