import { Button, Form } from "react-bootstrap";
import Header from "../../elements/NavigationBar.tsx"
import Footer from "../../elements/footer.tsx";

export default function login() {
    return (
        <>
            <Header />
            <div className="row background-2">
                <div className="col-1 background-1"></div>

                <div className="col-5">
                    <h1>Let's Get you back in Paradise</h1>
                    <div>
                        <Form.Label htmlFor="inputUsername">Username / Email</Form.Label>
                        <Form.Control
                            type="text"
                            id="inputUsername"
                        />
                    </div>

                    <br />
                    <div>
                        <Form.Label htmlFor="inputPassword">Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword"
                        />
                    </div>


                    <br />
                    <div>
                        <Button variant="secondary background-3">Let's Get Booking</Button>{' '}
                    </div>
                    <br />

                </div>
                <div className="col-1"></div>
                <div className="col-4">
                    <h1>SignUp</h1>
                </div>
                <div className="col-1 background-1"></div>
            </div>
            <Footer />
        </>
    )
}