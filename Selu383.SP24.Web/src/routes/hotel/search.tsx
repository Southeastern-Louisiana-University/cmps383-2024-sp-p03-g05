import { Link, useSearchParams } from "react-router-dom";
import { HotelDto } from "../../features/hotels/HotelDto";
import { useFetch } from "use-http";
import mountain from "../../assets/mountain-hole.jpg"
import Footer from "../../elements/footer";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

export default function FindHotel() {
    const [getSearchTerm, setSearchTerm] = useState("");
    const [params] = useSearchParams();
    const searchTerm = params.get("searchTerm");
    const {
        data: hotels,
        loading,
        error,
    } = useFetch<HotelDto[]>(
        "/api/hotels/SearchForHotel?searchTerm=" + searchTerm,
        {
            method: "get",
        },
        [searchTerm]
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div>
                Error... <button type="button"> try again</button>
            </div>
        );
    }

    return (
        <>
    
            <div style={{ backgroundImage: `url(${mountain})` }}>
                <div className="container">
                    <div className="row" >
                        <div className="col-1"></div>

                        <div className="col-10" >
                            <br />
                        <Form className="d-flex" >
                                <Form.Control
                                    type="search"
                                    placeholder="Search for a Hotel or City"
                                    className="me-2"
                                    aria-label="Search"
                                    value={getSearchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value ?? "")}
                                />
                                <Link
                                    onClick={(e) => (!getSearchTerm ? e.preventDefault() : null)}
                                    to={`/hotels/search?searchTerm=${encodeURIComponent(getSearchTerm)}`}
                                    aria-disabled={!getSearchTerm}
                                >
                                    <Button variant="success">Find my Hotel</Button>
                                </Link>

                            </Form>
                            {hotels?.map((hotel) => (
                                <>
                                    <br />
                                    <div className="container">
                                        <div className="row" style={{ backgroundColor: 'rgba(255,255,255,.95)' }}>
                                            <div className="col-1"></div>
                                            <div className="col-8">
                                                <div >
                                                    <br />
                                                    <h2>{hotel.name}</h2>
                                                    <p>{hotel.address}</p>
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <br />
                                                <Link to={`/hotels/details/${hotel.id}`}>
                                                    <Button variant="secondary background-1">Book a Reservation</Button>{" "}
                                                </Link>
                                            </div>
                                            <div className="col-1"></div>
                                        </div>
                                    </div>


                                    <br />
                                </>
                            ))}
                        </div>

                        <div className="col-1"></div>
                    </div>


                </div>
            </div>

            <Footer />
        </>

    );
}