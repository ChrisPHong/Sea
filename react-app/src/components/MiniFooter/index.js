import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import './miniFooter.css';
import github_logo from '../../images/github-logo.png';
import linkedin_logo from '../../images/linkedin-logo.png';

function MiniFooter () {
    // const history = useHistory()
    // const user = useSelector(state => state.session.user)

    return (
        <>
            <div className='mini-footer-container'>
                <div className='mini-footer-names'>
                    <div className='mini-developer-name-container'>
                        <div>Christopher Hong</div>
                        <div className="mini-socials-container">
                            <a href="https://www.linkedin.com/in/christopherpyohong/" target='_blank' rel='noreferrer' className="mini-linkedin-logo">
                                <img src={linkedin_logo} alt="logo" />
                            </a>
                            <a href="https://github.com/ChrisPHong" target='_blank' rel='noreferrer' className="mini-github-logo">
                                <img src={github_logo} alt="logo" />
                            </a>
                        </div>
                    </div>
                    <div className='mini-developer-name-container'>
                        <div>Grace Chi</div>
                        <div className="mini-socials-container">
                            <a href="https://www.linkedin.com/in/graceechi/" target='_blank' rel='noreferrer' className="mini-linkedin-logo">
                                <img src={linkedin_logo} alt="logo" />
                            </a>
                            <a href="https://github.com/graceechi" target='_blank' rel='noreferrer' className="mini-github-logo">
                                <img src={github_logo} alt="logo" />
                            </a>
                        </div>
                    </div>
                    <div className='mini-developer-name-container'>
                        <div>Christopher Chueng</div>
                        <div className="mini-socials-container">
                            <a href="https://www.linkedin.com/in/christopher-chueng/" target='_blank' rel='noreferrer' className="mini-linkedin-logo">
                                <img src={linkedin_logo} alt="logo" />
                            </a>
                            <a href="https://github.com/christopherchueng" target='_blank' rel='noreferrer' className="mini-github-logo">
                                <img src={github_logo} alt="logo" />
                            </a>
                        </div>
                    </div>
                    <div className='mini-developer-name-container'>
                        <div>Justin Yi</div>
                        <div className="mini-socials-container">
                            <a href="https://www.linkedin.com/in/justin-yi-0b6a6513a/" target='_blank' rel='noreferrer' className="mini-linkedin-logo">
                                <img src={linkedin_logo} alt="logo" />
                            </a>
                            <a href="https://github.com/JYi97" target='_blank' rel='noreferrer' className="mini-github-logo">
                                <img src={github_logo} alt="logo" />
                            </a>
                        </div>
                    </div>
                </div>
                <div id="mini-copyright">
                    ©2022 Sea. All rights reserved.
                </div>
            </div>
        </>
    )
}

export default MiniFooter;
