import './pagenotfound.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import seaLogo from './sea-icon.png';

function PageNotFound() {
    const sessionUser = useSelector(state => state?.session?.user);
    return (
        <div className='page-not-found'>
            <div className='page-not-found-box'>
                <img className='sea-logo-404' src={seaLogo} alt='sea-logo' />
                <p className='page-not-found-title' id='first-p'>
                    Looks like the page you were
                </p>
                <p className='page-not-found-title' id='second-p'>
                    looking for is not found!
                </p>
                <>
                    <p id='page-not-found-text'>
                        { sessionUser ?
                        <span id='back-to-home'><NavLink exact to='/dashboard'>Back to Dashboard</NavLink></span>
                        :
                        <span id='back-to-home'><NavLink exact to='/'>Back to Home</NavLink></span>
                        }
                    </p>
                </>
            </div>
        </div>
    )
}

export default PageNotFound;
