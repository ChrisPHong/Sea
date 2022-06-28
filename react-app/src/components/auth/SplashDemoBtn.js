import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from '../../store/session';
import './LoginForm.css';

const DemoButton = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async e => {
        e.preventDefault()

        await dispatch(login('demo@aa.io', 'password'))
        history.push('/dashboard') // not sure what dashboard userId to direct to yet
    }

    return (
        <button className="demo-btn" type='submit' onClick={handleSubmit}>Demo User</button>
    )
}

export default DemoButton;
