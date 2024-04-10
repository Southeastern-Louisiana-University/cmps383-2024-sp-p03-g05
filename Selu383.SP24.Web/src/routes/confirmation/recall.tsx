
import { Link, useParams, useSearchParams } from "react-router-dom";
import useFetch from "use-http";
import { reservationDto } from "../../features/reservations/reservationsDto";
import { userDto } from "../../features/user/userDto";
import ErrorPage from "../../error-page";

export default function recall() {

    const { id } = useParams();


    const {
        data: confirmations,
        loading: conLoading,
        error: conError,
    } = useFetch<reservationDto[]>(
        "/api/reservation/GetReservationByAny?id="+id,
        {
            method: "GET",
        },
        []
    );
    const confirmation = confirmations?.[0]
    console.log(confirmation)


    const {
        data: user,
        loading: userLoading,
        error: userError,
    } = useFetch<userDto>(
        "/api/authentication/me",
        {
            method: "GET",
        },
        []
    );

    console.log(user)
    if (conLoading || userLoading) {
        return  <>
        <div>Creating confirmation...</div>;
        <center> <div className="loader"></div></center>
       
        </> 
    }
    console.log(confirmation)
    console.log(confirmation?.guestId +" - - - "+ user?.id)
    if(confirmation?.guestId != user?.id){
        return(
            <>
            
            <h1>This is not your reservation</h1>
            <Link to={"/"}><button>Click here to return home</button></Link>
            
            </>
        );
    }
    if (conError || userError) {
        return (
            <ErrorPage />
        );
    }
    function handlePrint (){
        window.print()
    }


    return (
        <>
            <br />
            <center>
                <h1 style={{ color: "rgba(106, 163, 13,.65)" }}>Thank you for making your Reservation with EnStay</h1>
                <h4 style={{ color: "rgba(250, 250, 250,.85)" }}>See your confirmation below</h4>
            </center>
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10" style={{ backgroundColor: "white"}}>
                        <div className="container">
                            <div className="row">
                                <div className="col-9">
                                    <h1>{confirmation?.hotel ?? "Hotel Name"}</h1>
                                    <a href="tel:{confirmation?.phone ?? '(225) 910-8239'}"><i>{confirmation?.phone ?? "(225) 910-8239"}</i></a>
                                    
                                    <p>{confirmation?.address ?? "Placeholder Address, City, State, ZIP"}</p>
                                    
                                </div>
                                <div className="col-3">
                                    <br />
                                    <b> <i> {user?.firstName ?? "First Name"} {user?.lastName} </i></b>
                                    <p>Confirmation Number : <b>{confirmation?.id}</b></p>

                                    Confirmation Date :

                                    <p><b>{new Date(confirmation?.createdAt ?? "0").toDateString()}</b></p>


                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="container">
                            <div className="row">
                                <div className="col-2"></div>
                                <div className="col-4">
                                    <center>
                                        <h3>Check-In </h3> <h3>Date</h3>
                                        <p><b>{new Date(confirmation?.reservationStartDate ?? "0").toDateString()}</b></p>

                                        <h5>Check-In Time</h5>
                                        <b>3:00pm *</b>
                                    </center>

                                </div>
                                {/* <div className="col-2"></div> */}
                                <div className="col-4">
                                    <center>
                                        <h3>Check-Out </h3> <h3>Date</h3>
                                        <p><b>{new Date(confirmation?.reservationEndDate ?? "0").toDateString()}</b></p>

                                        <h5>Check-In Time</h5>
                                        <b>11:00am *</b>
                                    </center>
                                </div>
                                <div className="col-2"></div>
                            </div>

                        </div>
                        <br />
                        <center><p>* Times are Displayed in the Timezone of the Hotel</p></center>
<center>
    <button onClick={handlePrint}> Print or Save this Page </button>
</center>
                        <br />
                    </div>
                    <div className="col-1"></div>
                </div>

            </div>
            <br />
        </>
    )
}