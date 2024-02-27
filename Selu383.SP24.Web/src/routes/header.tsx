import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function Header() {
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
            
        </>
    );
}
