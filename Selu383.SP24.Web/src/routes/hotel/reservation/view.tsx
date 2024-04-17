import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { reservationDto } from "C:/Users/kendallcleveland/cmps383-2024-sp-p03-g05/Selu383.SP24.Web/src/features/reservations/reservationsDto";
import { Button } from "react-bootstrap";
import Footer from "C:/Users/kendallcleveland/cmps383-2024-sp-p03-g05/Selu383.SP24.Web/src/elements/footer";


function view() {
    const [view, setView] = useState<reservationDto[]>([]);


    useEffect(() => {
        fetch("/api/GetMyReservations", {
            method: "get",
        })
            .then<reservationDto[]>((r) => r.json())
            .then((j) => {
                setView(j);
            });
    }, []);

    return (
        <>
            <div style={{ background: "rgba(33,31,32,1)" }}>
<div className="container">
                <div className="row" >
                    <div className="col-1"></div>

                    <div className="col-10" >
                        {view.map((reservation) => (
                            <>
                                <br />
                                <div className="container">
                                    <div className="row" style={{ backgroundColor: 'rgba(255,255,255,.95)' }}>
                                        <div className="col-1"></div>
                                        <div className="col-8">
                                            <div >
                                                <br />
                                                <h2>{reservation.id}</h2>
                                                <p>{reservation.hotel}</p>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <br />
                                            <Link to={`/confirmation/recall/${reservation.id}`}>
                                                <Button variant="secondary background-1">View Your Reservation</Button>{" "}
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

        <Footer/>

        </>
    );
}

export default view;

