import { Button, Form, Col } from "react-bootstrap";
import Header from "../../elements/NavigationBar.tsx";
import Footer from "../../elements/footer.tsx";

const SignUp = () => {
  return (
    <>
      <Header />
      <div className="row background-2">
        <h1 className="center">Account Creation</h1>
        <div className="col-md-3 background-1"></div>
        <Col md={6}>
          <div className="text-center">
            <Form.Label htmlFor="inputUsername">Email</Form.Label>
            <Form.Control type="text" id="inputUsername" className="text-center border border-dark" />
          </div>
          <br />
          <div className="text-center">
            <Form.Label htmlFor="inputPassword">Password</Form.Label>
            <Form.Control type="password" id="inputPassword" className="text-center border border-dark" />
          </div>
          <br />
          <div className="text-center">
            <Form.Label htmlFor="inputFirstname">First Name</Form.Label>
            <Form.Control type="text" id="inputFirstname" className="text-center border border-dark" />
          </div>
          <br />
          <div className="text-center">
            <Form.Label htmlFor="inputLastname">Last Name</Form.Label>
            <Form.Control type="text" id="inputLastname" className="text-center border border-dark" />
          </div>
          <br />
          <div className="text-center">
            <Button variant="secondary background-1">Create Account</Button>
          </div>
        </Col>
        <div className="col-md-3 background-1"></div>
      </div>
      <div className="pb-4"></div>
      <Footer />
    </>
  );
};

export default SignUp;
