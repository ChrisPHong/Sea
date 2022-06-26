import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Dashboard.css'

const Dashboard = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state?.session?.user);

    useEffect(() => {

    }, [dispatch])

    return (
        <h1>Hi from Dashboard!</h1>
    )
}

export default Dashboard
