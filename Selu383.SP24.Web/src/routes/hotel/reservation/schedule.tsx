import { useState, useEffect, useContext } from "react";
import { packageGetDto } from "../../../features/package/packagesGetDto";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import AuthContext from "../../../features/authentication/AuthContext";


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


function BookButton({ packageId }: { packageId: number }) {
    const authContext = useContext(AuthContext);
    const [cardOnFile, setCardOnFile] = useState<boolean>(false);
    const [params] = useSearchParams();
    const checkInDate = params.get("checkInDate") ?? ""
    const checkoutDate = params.get("checkOutDate") ?? ""
    const { id } = useParams();
    const hotelId: string = id ?? ""
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    if (authContext?.user != null) {

        useEffect(() => {
            fetch("/api/users/GetCardOnFile?id=" + authContext?.user?.id, {
                method: "get",
            })
                .then<boolean>((r) => r.json())
                .then((j) => {
                    setCardOnFile(j);
                });
        }, []);

        if (cardOnFile) {
            return (
                <>
                    <Link to={`/confirmation/create?checkInDate=${encodeURIComponent(checkInDate)}&checkOutDate=${encodeURIComponent(checkoutDate)}&hotel=${encodeURIComponent(hotelId)}&package=${encodeURIComponent(packageId)}`}>
                        <Button variant="success " className="background-1"> Book My Room</Button>{" "}
                    </Link>
                </>
            )
        } else {
            return (<>
                
                <Button
                    variant="success "
                    className="background-1"
                    onClick={handleShow}
                >
                    Book My Room
                </Button>


                <Modal show={show} onHide={handleClose} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>Add Card Information on File</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Name on Card</strong>
                            </Form.Label>
                            <Form.Control type="text" placeholder={"Name on Card"} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Card Number</strong>
                            </Form.Label>
                            <Form.Control type="text" placeholder={"0000 0000 0000 0000"} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Expiration Date</strong>
                            </Form.Label>
                            <Form.Control type="text" placeholder={"01/24"} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>CCV</strong>
                            </Form.Label>
                            <Form.Control type="text" placeholder={"CCV"} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                        <Link to={`/confirmation/create?checkInDate=${encodeURIComponent(checkInDate)}&checkOutDate=${encodeURIComponent(checkoutDate)}&hotel=${encodeURIComponent(hotelId)}&package=${encodeURIComponent(packageId)}`}>
                            <Button variant="secondary " className="background-1">Book My Room</Button>{" "}
                        </Link>
                    </Modal.Footer>
                </Modal>
            </>)
        }

    }
    else {
        return (
            <>
                <Link to={`/login`}>
                    <Button variant="success " className="background-1">Login To Make a Reservation</Button>{" "}
                </Link>
            </>
        )

    }

}