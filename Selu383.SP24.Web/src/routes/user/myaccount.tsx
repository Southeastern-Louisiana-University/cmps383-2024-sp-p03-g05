import { useContext, useEffect, useState } from "react";
import AuthContext from "../../features/authentication/AuthContext";
import useFetch from "use-http";
import { Button, Form } from "react-bootstrap";

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
    const [cardOnFile, setCardOnFile] = useState<boolean>();


    const {
        data: cof,
    } = useFetch<boolean>(
        "/api/users/GetCardOnFile?id=" + id,
        {
            method: "GET",
            
        },
        []
        
    );
    console.log(cof)
    useEffect(() => { 
        setCardOnFile(cof)
        console.log(cof)
    },[])
    
    function toggle(){
        if(cardOnFile){
            setCardOnFile(false)
        }else{
            setCardOnFile(true)
        }
    }
    


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
                    onClick={() => toggle()}
                    >
                    Add Card on File
                </Button>
            </>
        )
    }

}