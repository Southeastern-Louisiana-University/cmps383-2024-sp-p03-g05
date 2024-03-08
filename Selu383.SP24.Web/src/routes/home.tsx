
import Footer from "../elements/footer.tsx"
import Hotelimg from '../assets/Enstay-Hotel1.jpg'
import lawn from "../assets/chairs_with_grass.jpg"
import beach from "../assets/beach-sunset.jpg"
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";


function Home() {

    return (
        <>

            {/* This is here to allow me to do a Rebase */}

        
            <div className="" style={{
                backgroundImage: `url(${lawn})`,
                height: "90vh",
                fontSize: "50px",

                backgroundRepeat: "no-repeat",
            }}>
                <br />
                <div className="container">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10" style={{ backgroundColor: 'rgba(255,255,255,.65)', height: "70vh" }}>
                        <br />
                        <h3>Destination : </h3>
                        <Form.Select size="lg" aria-label="Default select example">
                            <option>Where do you want to get away to?</option>
                            <option value="2">Hammond, LA &nbsp; - &nbsp; Courtyard by EnStay </option>
                            <option value="1">New Orleans, LA &nbsp; - &nbsp; Enstay New Orleans Riverside    </option>
                            <option value="3">New Orleans, LA &nbsp; - &nbsp; EnStay Regency</option>
                        </Form.Select>
                        <br />
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-4">
                                <h4>Check In</h4>
                                <Form.Control type="date" />

                            </div>
                            <div className="col-2">
                                <br />
                                <center>
                                    <Button variant="secondary background-1">Plan my Paradise</Button>{" "}
                                </center>
                            </div>
                            <div className="col-4">
                                <h4>Check Out</h4>
                                <Form.Control type="date" />

                            </div>
                            <div className="col-1"></div>
                        </div>

                    </div>
                    <div className="col-1"></div>

                </div>
                </div>
                
            </div>


            <div style={{
                backgroundColor: 'rgba(33,31,32,1)',
                height: "2vh",
            }}>
            </div>


            <div style={{
                backgroundImage: `url(${beach})`,
                height: "80vh",
                // fontSize: "50px",
                backgroundRepeat: "no-repeat",
            }}>
                <br />

                <div className="container" style={{ backgroundColor: 'rgba(255,255,255,.45)' }}>
                    <div className="row">
                        <div className="col-1"></div>

                        <div className="col-2">
                            <table>
                                <tr>
                                    <td><h3>We have Info</h3></td>
                                </tr>
                                <tr>
                                    <td><img src="https://loremflickr.com/250/300" /></td>
                                </tr>
                                <tr>
                                    <td><p>hello I say words and more works with stuff and more stuff</p></td>
                                </tr>
                            </table>
                        </div>
                        <div className="col-2"></div>

                        <div className="col-2">
                            <table>
                                <tr>
                                    <td><h3>We have Info</h3></td>
                                </tr>
                                <tr>
                                    <td><img src="https://loremflickr.com/250/300" /></td>
                                </tr>
                                <tr>
                                    <td><p>hello I say words and more works with stuff and more stuff</p></td>
                                </tr>
                            </table>
                        </div>
                        
                        <div className="col-2"></div>

                        <div className="col-2">
                            <table>
                                <tr>
                                    <td><h3>We have Info</h3></td>
                                </tr>
                                <tr>
                                    <td><img src="https://loremflickr.com/250/300" /></td>
                                </tr>
                                <tr>
                                    <td><p>hello I say words and more works with stuff and more stuff</p></td>
                                </tr>
                            </table>
                            
                        </div>
                        <div className="col-1">
                            {/* <h1>Comment Here</h1> */}
                        </div>
                    </div>


                </div>

</div>

            
            <Footer />
        </>
    )
}

export default Home