import { SetStateAction, useState } from "react";
import { useSearchParams, useParams, Link } from "react-router-dom";
import { packageGetDto } from "../../../features/package/packagesGetDto";
import useFetch from "use-http";
import Carousel from 'react-bootstrap/Carousel';
import { Button } from "react-bootstrap";
import { HotelDto } from "../../../features/hotels/HotelDto";
import { RoomGetDto } from "../../../features/rooms/roomGetDto";

export default function confirmation() {
    const [packages, setpackages] = useState<packageGetDto[]>([]);
    const [params] = useSearchParams();
    const { hotelId, packageId } = useParams();
    const checkInDateArray = params.get("checkInDate")?.split("-") ?? [];
    const checkInDate = params.get("checkInDate") ?? "";

    const checkOutDateArry = params.get("checkOutDate")?.split("-") ?? [];
    const checkOutDate = params.get("checkOutDate") ?? "";

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: SetStateAction<number>) => {
        setIndex(selectedIndex);
    };

    const {
        data: rooms,
        loading,
        error,
    } = useFetch<RoomGetDto[]>(
        "/api/room/GetRoomByAny?packageId=" + packageId + "&roomStatus=Available&hotelId=" + hotelId,
        {
            method: "get",
        },
        []
    );

    const {
        data: hotel,
    } = useFetch<HotelDto>(
        "/api/hotels/" + hotelId,
        {
            method: "get",
        },
        []
    );

    // const {
    //     data: package,
    // } = useFetch<packageGetDto>(
    //     "/api/hotels/" + packageId,
    //     {
    //         method: "get",
    //     },
    //     []
    // );

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
            {console.log(rooms)}
            <div className="container">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10" style={{ backgroundColor: 'rgba(200,200,200,.65)', height: "50vh" }}>
                        <center><h1>Select your Room </h1></center>

                        <Carousel activeIndex={index} onSelect={handleSelect}>

                            {rooms?.map((room) => (
                                <Carousel.Item>
                                    <div>
                                        <center>
                                            <hr />
                                            <h1>{hotel?.name}</h1>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-1">
                                                    </div>
                                                    <div className="col-5">
                                                        <h3>Package Name Here</h3>
                                                        <p>Things that are included</p>
                                                    </div>
                                                    <div className="col-6">
                                                        <h2>${room.price}</h2>
                                                        <h3>Room #{room.roomNumber}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <Link to={`/confirmation/create?checkInDate=${encodeURIComponent(checkInDate)}&checkOutDate=${encodeURIComponent(checkOutDate)}&room=${encodeURIComponent(room.id)}`}>
                                                    <Button variant="outline-success ">Make My Reservation</Button>{" "}
                                                </Link>
                                            </div>

                                        </center>

                                        <br />
                                    </div>
                                    <br />
                                </Carousel.Item>
                            ))}

                        </Carousel>
                    </div>

                    <div className="col-1"></div>
                </div>
            </div>
        </>
    )
}