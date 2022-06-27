import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { searchStocks } from '../../store/searchbar';
import './searchbar.css';

function SearchBar () {
    // const dispatch = useDispatch();
    // const history = useHistory();
    // const stocks = useSelector(state => state.search.entries);

    return (

        <>
            <h1>Search Bar goes here</h1>
        </>
    )
}

export default SearchBar;
