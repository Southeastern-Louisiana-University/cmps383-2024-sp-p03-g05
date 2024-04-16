import { useContext } from "react";
import AuthContext from "../../features/authentication/AuthContext";

export default function MyAccount(){
    const authContext = useContext(AuthContext);
    if (authContext?.user != null){
         return(
            <>
                <h1>Welcome, {authContext.user.firstName}</h1>

            </>
        );
    }
   
}