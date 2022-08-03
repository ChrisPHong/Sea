import './pagenotfound.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PageNotFound() {
    const sessionUser = useSelector(state => state?.session?.user);
    return (
        <div className='page-not-found'>
            <p id='page-not-found-title'>
                Looks like the page you were looking for is not found!
            </p>
            <>
                <p id='page-not-found-text'>
                    Go back to <span> </span>
                    { sessionUser ?
                    <span id='back-to-home'><NavLink exact to='/dashboard'>your dashboard! </NavLink></span>
                    :
                    <span id='back-to-home'><NavLink exact to='/'>Sea Homepage! </NavLink></span>
                    }
                </p>
            </>
        </div>
    )
}

export default PageNotFound;
