import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import './footer.css';
import github_logo from '../../images/github-logo.png';
import linkedin_logo from '../../images/linkedin-logo.png';

function Footer () {
    // const history = useHistory()
    // const user = useSelector(state => state.session.user)

    return (
        <>
            <div className='footer-container'>
                <div className='footer-names'>
                    <div className='developer-name-container'>
                        <div>Christopher Hong</div>
                        <div className="socials-container">
                            <a href="https://www.linkedin.com/in/christopherpyohong/" target='_blank' rel='noreferrer' className="linkedin-logo">
                                <img src={linkedin_logo} alt="logo" />
                            </a>
                            <a href="https://github.com/ChrisPHong" target='_blank' rel='noreferrer' className="github-logo">
                                <img src={github_logo} alt="logo" />
                            </a>
                        </div>
                    </div>
                    <div className='developer-name-container'>
                        <div>Grace Chi</div>
                        <div className="socials-container">
                            <a href="https://www.linkedin.com/in/graceechi/" target='_blank' rel='noreferrer' className="linkedin-logo">
                                <img src={linkedin_logo} alt="logo" />
                            </a>
                            <a href="https://github.com/graceechi" target='_blank' rel='noreferrer' className="github-logo">
                                <img src={github_logo} alt="logo" />
                            </a>
                        </div>
                    </div>
                    <div className='developer-name-container'>
                        <div>Christopher Chueng</div>
                        <div className="socials-container">
                            <a href="https://www.linkedin.com/in/christopher-chueng/" target='_blank' rel='noreferrer' className="linkedin-logo">
                                <img src={linkedin_logo} alt="logo" />
                            </a>
                            <a href="https://github.com/christopherchueng" target='_blank' rel='noreferrer' className="github-logo">
                                <img src={github_logo} alt="logo" />
                            </a>
                        </div>
                    </div>
                    <div className='developer-name-container'>
                        <div>Justin Yi</div>
                        <div className="socials-container">
                            <a href="https://www.linkedin.com/in/justin-yi-dev/" target='_blank' rel='noreferrer' className="linkedin-logo">
                                <img src={linkedin_logo} alt="logo" />
                            </a>
                            <a href="https://github.com/JYi97" target='_blank' rel='noreferrer' className="github-logo">
                                <img src={github_logo} alt="logo" />
                            </a>
                        </div>
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
