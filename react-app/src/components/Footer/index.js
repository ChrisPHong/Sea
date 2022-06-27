import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './footer.css';

function Footer () {
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    return (
        <>
            <div className='footer-container'>
                <div className='footer-names'>
                    <div className='developer-name-container'>
                        <div>Christopher Hong</div>
                    </div>
                    <div className='developer-name-container'>
                        <div>Grace Chi</div>
                    </div>
                    <div className='developer-name-container'>
                        <div>Christopher Chueng</div>
                    </div>
                    <div className='developer-name-container'>
                        <div>Justin Yi</div>
                    </div>
                </div>
                <div id="copyright">
                    ©2022 Sea. All rights reserved.
                </div>
            </div>
        </>
    )
}

export default Footer;
