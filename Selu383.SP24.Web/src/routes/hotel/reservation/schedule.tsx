import { useState, useEffect } from "react";
import { packageGetDto } from "../../../features/package/packagesGetDto";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Button } from "react-bootstrap";


export default function schedule() {

    const [packages, setpackages] = useState<packageGetDto[]>([]);
    const [params] = useSearchParams();
    const { id } = useParams();
    const checkInDateArray = params.get("checkInDate")?.split("-") ?? [];
    const checkInDate: Date = new Date(parseInt(checkInDateArray[0]), parseInt(checkInDateArray[1]) - 1, parseInt(checkInDateArray[2]));

    const checkOutDateArry = params.get("checkOutDate")?.split("-") ?? [];
    const checkOutDate: Date = new Date(parseInt(checkOutDateArry[0]), parseInt(checkOutDateArry[1]) - 1, parseInt(checkOutDateArry[2]));



    useEffect(() => {
        fetch(`/api/room/GetAllAvailablePackages?hotelId=${id}`, {
            method: "get",
        })
            .then<packageGetDto[]>((r) => r.json())
            .then((j) => {
                setpackages(j);
            });
    }, []);

    return (
        <>
            <center>

                <h4>{checkInDate.toDateString()} - {checkOutDate.toDateString()}</h4>
            </center>

            {packages?.map((roomPackage) => (
                <>
                    <div>
                        <div className="container">
                            <div className="row " style={{ backgroundColor: 'rgba(201, 218, 234, .60)' }}>
                                <div className="col-1"></div>
                                <div className="col-4 ">
                                    <div >
                                        <br />
                                        <h2>{roomPackage.title}</h2>
                                        <p>{roomPackage.description}</p>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <br />
                                    <p>Starting at : ${roomPackage.startingPrice}/Night</p>
                                </div>
                                <div className="col-2 ">
                                    <BookButton packageId={roomPackage.id} />
                                    {/* <Link to={`/hotels/details/${roomPackage.id}`}>
                                    <Button variant="outline-success ">Book my Suite</Button>{" "}
                                </Link> */}
                                </div>
                                <div className="col-1"></div>
                            </div>
                        </div>
                        <br />
                    </div>

                </>

            ))}

        </>
    )
}


function BookButton({packageId}:{packageId: number}) {
    const [isAuthed, setIsAuthed] = useState(false);
    const [params] = useSearchParams();
    const checkInDate = params.get("checkInDate") ?? ""
    const checkoutDate = params.get("checkOutDate") ?? ""
    const { id } = useParams();
    const hotelId:string = id ?? ""

    useEffect(() => {
        fetch(`/api/authentication/me`, {
            method: "get",
        })
            .then(response => { if (response.ok) { setIsAuthed(true) } })
    }, []);


    if (isAuthed) {
        return (
            <>
                <Link to={`/confirmation/create?checkInDate=${encodeURIComponent(checkInDate)}&checkOutDate=${encodeURIComponent(checkoutDate)}&hotel=${encodeURIComponent(hotelId)}&package=${encodeURIComponent(packageId)}`}>
                    <Button variant="outline-success ">Book my Suite</Button>{" "}

                </Link>
            </>
        )
    }
    else {
        return (
            <>
            <Link to={`/login`}>
                <Button variant="outline-success ">Make login Model</Button>{" "}
            </Link>
            </>
        )

    }

}