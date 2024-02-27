import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function Root() {
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
            <img src="Enstay-Hotel1.jpg" alt="Nice exterior of hotel" className="center-picture"></img>
            <p className='p1'>Welcome to Enstay, your home away from home!</p>
            <br></br>
            <p> Come stay at one of Enstay's many hospitable hotels so while you go on a fantastic vacation, 
                you can have the peace of mind knowing you have somewhere to rest and recharge to get
                back out there and have fun!
            </p>
        </>
    );
}
