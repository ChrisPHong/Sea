import React from 'react';
// import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './splashpage.css';


function SplashPage() {
    const history = useHistory()

    const handleSubmit = () => {
        history.push('/sign-up')
    }
    return (
        <>
            <div className="panel-one">
                <div className='panel-one-description'>
                    <h1>Investing is</h1>
                    <h1>simple here</h1>
                    <div className='splash-h1-spacer'></div>
                    <p>Commission-free investing, plus the tools</p>
                    <p>you need to put your money in motion. Sign</p>
                    <p>up and get your first stock for free. Certain</p>
                    <p>limitations apply.</p>
                    <button onClick={handleSubmit}>Get Started</button>
                </div>
                <div className='panel-one-image'>
                    <img height="500em" src="/images/splash-image-01.jpg" alt="splash_image"></img>
                </div>
            </div>
            <div className='splash-disclaimer'>
                <p id='splash-disclaimer-one'>Dive into Sea and get your first stock free.</p>
                <p id='splash-disclaimer-two'>Disclaimer: this website does not represent real-time data.</p>
            </div>
        </>
    )
}

export default SplashPage;
