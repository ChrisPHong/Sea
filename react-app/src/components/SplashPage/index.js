import React from 'react';
import { useHistory } from 'react-router-dom';
import DemoButton from '../auth/SplashDemoBtn';
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
                    <div id="panel-h1-spacer"></div>
                    <p>Commission-free investing, plus the tools</p>
                    <p>you need to put your money in motion. Dive</p>
                    <p>into Sea and get your first stock for free.</p>
                    <p>Certain limitations apply.</p>
                    <button id="get-started-btn" onClick={handleSubmit}>Get Started</button>
                    <DemoButton />
                </div>
            </div>
            <div className='splash-disclaimer'>
                <p id='splash-disclaimer-one'>Disclaimer: this website does not represent real-time data.</p>
            </div>

        </>
    )
}

export default SplashPage;
