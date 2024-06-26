import { Link, Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HotelDto } from "../../features/hotels/HotelDto";
import { Button, Form } from "react-bootstrap";
import { packageGetDto } from "../../features/package/packagesGetDto";





export default function hotelDetails() {

    const { id } = useParams();

    const [hotel, setHotel] = useState<HotelDto>();

    const [getCheckInDate, setCheckInDate] = useState("");
    const [getCheckOutDate, setCheckOutDate] = useState("");


    useEffect(() => {
        fetch("/api/hotels/" + id, {
            method: "get",
        })
            .then<HotelDto>((r) => r.json())
            .then((j) => {
                setHotel(j);
            });
    }, []);

    useEffect(() => {
        fetch("/api/packages/", {
            method: "get",
        })
            .then<packageGetDto[]>((r) => r.json())
            .then((_j) => {
                //setpackages(j);
            });
    }, []);


    return (
        <>
            <div style={{ background: "rgba(33,31,32,1)" }}>
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

                                                        <Form.Control type="date"
                                                            value={getCheckInDate}
                                                            onChange={(e) => setCheckInDate(e.target.value ?? "")}
                                                        />
                                                    </div>
                                                    <div className="col-2">
                                                    </div>
                                                    <div className="col-4">
                                                        <h4>Check Out</h4>

                                                        <Form.Control type="date"
                                                            value={getCheckOutDate}
                                                            onChange={(e) => setCheckOutDate(e.target.value ?? "")}
                                                        />
                                                    </div>
                                                    <div>
                                                        <br />
                                                        <center>
                                                            <Link
                                                                onClick={(e) => (!getCheckInDate ? e.preventDefault() : null || !getCheckOutDate ? e.preventDefault() : null)}
                                                                to={`/hotels/details/${hotel?.id}/schedule?checkInDate=${encodeURIComponent(getCheckInDate)}&checkOutDate=${encodeURIComponent(getCheckOutDate)}`}
                                                                aria-disabled={!getCheckInDate || !getCheckOutDate}
                                                            >
                                                                <Button variant="secondary background-1">Let's See What's Available</Button>{" "}
                                                            </Link>

                                                        </center>
                                                        <br />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-1"></div>
                                        <Outlet />
                                    </div>

                                </div>


                                <br />
                            </>

                        </div>

                        <div className="col-1"></div>
                    </div>


                </div>

            </div>



        
        </>
    );
}

