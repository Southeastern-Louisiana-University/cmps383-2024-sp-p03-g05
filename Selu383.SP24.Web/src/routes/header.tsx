import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function Root() {
    return (
        <>
            <header className="header">
                <h1>My Website</h1>
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
                            <div className='col-7'></div>
                            <div className='col-1'>
                                <Link to={'/login'}> login </Link>
                            </div>
                        </div>

                    </ul>
                </nav>
            </header>
        </>
    );
}
