import { Link } from "react-router-dom";
import Header from "./header.tsx"

const SignUp = () => {
    return (
        <>
        <Header/>
        <h1 className="center">Account Creation</h1>
        <form> 
            <p>
                <label htmlFor="first">First Name =</label>
                <input type="text" id="first" name="first" placeholder="First Name?"></input>
            </p>
            <p>
                <label htmlFor="last">Last Name =</label>
                <input type="text" id="last" name="last" placeholder="Last Name?"></input>
            </p>
            <p>
                <label htmlFor="email">Email =</label>
                <input type="text" id="email" name="email" placeholder="Email?"></input>
            </p>
            <p>
                <input type="submit" value="Submit" className="signupbutton"></input>
                
            </p>
        </form>
    </>
    );
  };
  
  export default SignUp;