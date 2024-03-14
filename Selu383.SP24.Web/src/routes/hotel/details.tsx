import { Outlet, useParams } from "react-router-dom";
import Footer from "../../elements/footer";
import { useEffect, useState } from "react";
import mountain from "../../assets/mountain-hole.jpg"

import { HotelDto } from "../../features/hotels/HotelDto";
import { Button, Form } from "react-bootstrap";
import { roomGetDto } from "../../features/rooms/roomGetDto";
import { packageGetDto } from "../../features/package/packagesGetDto";





export default function hotelDetails() {


    const { id } = useParams();

    const [hotel, setHotel] = useState<HotelDto>();

    const [packages, setpackages] = useState<packageGetDto[]>([]);


    useEffect(() => {
        fetch("/api/hotels/" + id, {
            method: "get",
        })
            .then<HotelDto>((r) => r.json())
            .then((j) => {
                setHotel(j);
            });
    });

    useEffect(() => {
        fetch("/api/packages/", {
            method: "get",
        })
            .then<packageGetDto[]>((r) => r.json())
            .then((j) => {
                setpackages(j);
            });
    });


    return (
        <>
            <div style={{ backgroundImage: `url(${mountain})` }}>
                <div className="container">
                    <div className="row" >
                        <div className="col-1"></div>
                        <div className="col-10" >
                            <>                                
                            <br />
                                <div className="container">
                                    <div className="row" style={{ backgroundColor: 'rgba(255,255,255,.80)' }}>
                                        <div className="col-1"></div>
                                        <div className="col-10">
                                            <div >
                                                <br />
                                                <center><h1> Welcome to {hotel?.name}</h1>
                                                    <h3>located at {hotel?.address}</h3>
                                                    <p>Please Enjoy your Stay</p>
                                                <h3>When should we be Expeting you? </h3></center>
                                                
                                                <br />
                                                <div className="row">
                                                    <div className="col-1"></div>
                                                    <div className="col-4">
                                                        <h4>Check In</h4>
                                                        <Form.Control type="date" />
                                                    </div>
                                                    <div className="col-2">
                                                    </div>
                                                    <div className="col-4">
                                                        <h4>Check Out</h4>
                                                        <Form.Control type="date" />
                                                    </div>
                                                    <div>
                                                        <br />
                                                        <center>
                                                            <Button variant="secondary background-1">Let's See What's Available</Button>{" "}
                                                        </center>
                                                        <br />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-1"></div>
                                    </div>
                                </div>


                                <br />
                            </>

                        </div>

                        <div className="col-1"></div>
                    </div>


                </div>
            </div>

            {packages?.map((roomPackage) => (
                <div>
                    {roomPackage.Description}
                </div>
            ))}

            <Footer />
        </>
    );
}

