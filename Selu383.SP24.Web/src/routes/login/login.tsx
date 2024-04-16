import { FormEvent, useContext, useState } from 'react';
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import useFetch from 'use-http';
import { useNavigate } from "react-router-dom";
import AuthContext from "../../features/authentication/AuthContext";



export default function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const authContext = useContext(AuthContext);

  const { loading, post } = useFetch("/api/authentication/login", {
    method: "post",
    onNewData: (_, x) => {
      if (typeof x === "string") {
        setError(x);
      } else if (typeof x === "object") {
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
          <h1 className="text-center mb-4">Let's Get you back in Paradise</h1>
    <form className="text-center" onSubmit={handleSubmit}>
    <Form.Group className="mb-3">
    <Form.Label><strong>Email</strong></Form.Label>
      <Form.Control
        id="email"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        type="text"
        autoComplete="email"
        placeholder="Email"
        style={{ width: "50%", margin: "auto" }} 
        required
      />
      </Form.Group>
      <Form.Group className="mb-3">
      <Form.Label><strong>Password</strong></Form.Label>
      <Form.Control
        id="password"
        value={password}
        style={{ width: "50%", margin: "auto" }} 
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        autoComplete="password"
        placeholder='Password'
        required
      />
      </Form.Group>
      {loading ? "Checking Login..." : null}
      {error ? error : null}
      <Button 
              variant="secondary" 
              className="background-1" 
              style={{ width: "50%", margin: "auto" }}
              type="submit" disabled={loading}
              
              >Let's Get Booking</Button>
    </form>
    <h1 className="text-center mt-4">First Time?</h1>
           <Link to={"./signup"} className="text-center">
             <Button variant="secondary" className="background-1" style={{ width: "50%", margin: "auto" }}>Sign Up Here</Button>
          </Link>
    
    </div>
    </div>
    </>
    
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // stops the browser from causing a page refresh - more on this in the lecture

    if (loading) {
      return;
    }

    post({
      userName: userName,
      password: password,
    });

    // TODO: call /me, redirect
  }
}