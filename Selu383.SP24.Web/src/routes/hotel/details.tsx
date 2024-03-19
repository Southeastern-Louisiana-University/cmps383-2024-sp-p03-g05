import { useParams } from "react-router-dom";
import Footer from "../../elements/footer";
import { useEffect, useState } from "react";
import mountain from "../../assets/mountain-hole.jpg"

import { HotelDto } from "../../features/hotels/HotelDto";




export default function hotelDetails() {


    const { id } = useParams();

    const [hotel, setHotel] = useState<HotelDto>();


    useEffect(() => {
        fetch("/api/hotels/" + id, {
            method: "get",
        })
            .then<HotelDto>((r) => r.json())
            .then((j) => {
                setHotel(j);
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
                                                <p>Please Enjoy your Stay</p></center>
                                                
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
            


            <Footer />
        </>
    );
}
