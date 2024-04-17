import { useContext, useEffect, useState } from "react";
import AuthContext from "../../features/authentication/AuthContext";
import useFetch from "use-http";
import { Button, Form, Modal } from "react-bootstrap";

export default function MyAccount() {
    const authContext = useContext(AuthContext);

    if (authContext?.user != null) {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-10" style={{ backgroundColor: 'rgba(200,200,200,.65)' }}>
                            <hr />
                            <h2>Welcome, {authContext.user.firstName}</h2>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Name</strong>
                                </Form.Label>
                                <Form.Control type="text" disabled placeholder={authContext.user.firstName + " " + authContext.user.lastName} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Email</strong>
                                </Form.Label>
                                <Form.Control type="text" disabled placeholder={authContext.user.userName} />
                            </Form.Group>

                            <CofButton id={authContext.user.id} />

                            <div>
                                <hr />
                            </div>

                        </div>
                        <div className="col-1"></div>
                    </div>

                </div>


            </>
        );
    }

}

function CofButton({ id }: { id: number }) {
    const [cardOnFile, setCardOnFile] = useState<boolean>(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    


    useEffect(() => {
        fetch("/api/users/GetCardOnFile?id=" + id, {
            method: "get",
        })
            .then<boolean>((r) => r.json())
            .then((j) => {
                setCardOnFile(j);
            });
    }, []);
    



    
    function toggle() {
        if (cardOnFile) {
            console.log("Removing Card on File")
            setCardOnFile(false)
        } else {
            console.log("Adding Card on File")
            setCardOnFile(true)
        }
    }

    console.log(cardOnFile)

    if (cardOnFile) {
        return (
            <>
                <Button variant="danger"
                    className="w-150 mt-3"
                    onClick={() => toggle()}
                >
                    Remove Card on File

                </Button>
            </>
        )
    } else {
        return (
            <>
                <Button
                    variant="secondary"
                    className="w-25 background-1"
                    onClick={handleShow}
                >
                    Add Card on File
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
                        <Button variant="secondary" className="background-1" onClick={function () { handleClose; toggle() }}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

}