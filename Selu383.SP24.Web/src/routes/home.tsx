
import Footer from "../elements/footer.tsx"
import Hotelimg from '../assets/Enstay-Hotel1.jpg'
import lawn from "../assets/chairs_with_grass.jpg"
import beach from "../assets/beach-sunset.jpg"
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";


function Home() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <>

            {/* This is here to allow me to do a Rebase */}


            <div className="" style={{
                backgroundImage: `url(${lawn})`,
                height: "70vh",
                fontSize: "50px",

                backgroundRepeat: "no-repeat",
            }}>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-10" style={{ backgroundColor: 'rgba(255,255,255,.65)', height: "40vh" }}>
                            <br />
                            <h3>Let's plan your next Destination : </h3>
                            <Form className="d-flex" >
                                <Form.Control
                                    type="search"
                                    placeholder="Search for a Hotel or City"
                                    className="me-2"
                                    aria-label="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value ?? "")}
                                />



                                <Link
                                    onClick={(e) => (!searchTerm ? e.preventDefault() : null)}
                                    to={`/hotels/search?searchTerm=${encodeURIComponent(searchTerm)}`}
                                    aria-disabled={!searchTerm}
                                >
                                    <Button variant="success">Find my Hotel</Button>
                                </Link>

                            </Form>
                            <br />

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