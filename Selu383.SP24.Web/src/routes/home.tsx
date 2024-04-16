import Footer from "../elements/footer.tsx"
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";


function Home() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <>

            <div className="" style={{
                
                height: "80vh",
            }}>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-1"></div>
                         <div className="col-10  ouline-1" style={{ backgroundColor: 'rgba(200,200,200,.65)', height: "40vh" }}> 
                            <br />
                            <center><h1 style={{color: ''}}>Let's plan your next Destination</h1></center>
                            
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
        </>
    )
}

export default Home
