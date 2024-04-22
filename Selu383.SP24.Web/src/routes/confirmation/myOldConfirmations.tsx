import { reservationDto } from "../../features/reservations/reservationsDto";
import useFetch from "use-http";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function myOldConfirmations() {
    const {
        data: reservations,
        loading,
        error,
    } = useFetch<reservationDto[]>(
        "/api/reservation/GetMyOldReservations",
        {
            method: "get",
        },
        []
    );
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div>
                <Link className='header-text' to={"/"}>Home </Link>
            </div>
        );
    }

    
    return (
        <>
            <div style={{ background: "rgba(33,31,32,1)" }}>
                <div className="container">
                    <div className="row" >
                        <div className="col-1"></div>

                        <div className="col-10" >
                            <br />
                            <center>
                                <Link to={'/confirmation'}>
                                    <Button variant="secondary background-1">View Future Reservations</Button>{" "}
                                </Link>
                            </center>
                            {reservations?.map((reservation) => (
                                <>
                                    <br />
                                    
                                    <ConfirmationBar reservation={reservation} />

                                    <br />
                                </>
                            ))}
                        </div>

                        <div className="col-1"></div>
                    </div>


                </div>
            </div>
        </>
    )
}

function ConfirmationBar({ reservation }: { reservation: reservationDto }) {
    const startDate = new Date(reservation?.reservationStartDate)
    const endDate = new Date(reservation?.reservationEndDate)
    const currentDate = new Date()

    if(startDate <= currentDate && currentDate <= endDate){
        return(
            <>
            <div className="container">
            <div className="row" style={{ backgroundColor: 'rgba(255,255,255,.95)' }}>
                <div className="col-1"></div>
                <div className="col-4">
                    <div>
                        <br />
                        <h2>{reservation.hotel ?? "Hotel Name"}</h2>
                        <p><a href="tel:{reservation?.phone ?? '(225) 910-8239'}"><i>{reservation?.phoneNumber ?? "(225) 910-8239"}</i></a></p>
                        <p>{reservation?.address ?? "Placeholder Address, City, State, ZIP"}</p>
                    </div>
                </div>
                <div className="col-4">
                    <div>
                        <br />
                        <p><b>{new Date(reservation?.reservationStartDate ?? "0").toDateString()}</b></p>
                        <br />
                        <p><b>{new Date(reservation?.reservationEndDate ?? "0").toDateString()}</b></p>
                    </div>
                </div>
                <div className="col-2">
                    <br />
                    
                        <Button variant="secondary background-1">Open My Room</Button>{" "}
                    
                </div>
                <div className="col-1"></div>
            </div>
        </div>
            </>
        )
    }
    return (<>

        <div className="container">
            <div className="row" style={{ backgroundColor: 'rgba(255,255,255,.95)' }}>
                <div className="col-1"></div>
                <div className="col-4">
                    <div>
                        <br />
                        <h2>{reservation.hotel ?? "Hotel Name"}</h2>
                        <p><a href="tel:{reservation?.phone ?? '(225) 910-8239'}"><i>{reservation?.phoneNumber ?? "(225) 910-8239"}</i></a></p>
                        <p>{reservation?.address ?? "Placeholder Address, City, State, ZIP"}</p>
                    </div>
                </div>
                <div className="col-4">
                    <div>
                        <br />
                        <p><b>{new Date(reservation?.reservationStartDate ?? "0").toDateString()}</b></p>
                        <br />
                        <p><b>{new Date(reservation?.reservationEndDate ?? "0").toDateString()}</b></p>
                    </div>
                </div>
                <div className="col-2">
                    <br />
                    <Link to={`/confirmation/recall/${reservation.id}`}>
                        <Button variant="secondary background-1">View Confirmation</Button>{" "}
                    </Link>
                </div>
                <div className="col-1"></div>
            </div>
        </div>

    </>)
}