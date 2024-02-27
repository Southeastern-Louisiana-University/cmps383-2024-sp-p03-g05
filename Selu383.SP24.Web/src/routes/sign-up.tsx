import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <>
        <header className="header">
            <h1>EnStay</h1>
            <nav>
                <ul>
                    <div className='row'>
                        <div className='col-1'>
                            <Link to={'/'}> Home </Link>
                        </div>
                        <div className='col-1'>
                            <Link to={'/hotels'}> Hotels </Link>
                        </div>
                        <div className='col-1'>
                            <Link to={'/appointments'}> Appointments </Link>
                        </div>
                        <div className='col-1'>
                            <Link to={'/'}> Other Link </Link>
                        </div>
                        <div className='col-6'></div>
                        <div className='col-1'>
                            <Link to={'/login'}> Login </Link>
                        </div>
                        <div className='col-1'>
                            <Link to={'/sign-up'}> Sign-Up </Link>
                        </div>
                    </div>

                </ul>
            </nav>
        </header>
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