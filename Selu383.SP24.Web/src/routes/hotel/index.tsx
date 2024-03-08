import { Link } from "react-router-dom";
import Footer from "../../elements/footer";
import { useEffect, useState } from "react";
import mountain from "../../assets/mountain-hole.jpg"
import { Button } from "react-bootstrap";
import { HotelDto } from "../../features/hotels/HotelDto";



function hotels() {
    const [hotels, setHotels] = useState<HotelDto[]>([]);


    useEffect(() => {
        fetch("/api/hotels", {
            method: "get",
        })
            .then<HotelDto[]>((r) => r.json())
            .then((j) => {
                setHotels(j);
            });
    });



    return (
        <>
            <div style={{ backgroundImage: `url(${mountain})` }}>
<div className="container">
                <div className="row" >
                    <div className="col-1"></div>

                    <div className="col-10" >
                        {hotels.map((hotel) => (
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
                                            <Link to={`/hotel-details/${hotel.id}`}>
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

export default hotels;