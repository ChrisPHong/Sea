import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { searchStocks } from '../../store/searchbar';
import './searchbar.css';

function SearchBar () {
    const dispatch = useDispatch();
    const history = useHistory();
    const stocks = useSelector(state => state.stock.entries);
    // const currentUser = useSelector(state => state?.session?.user);

    const tickers = stocks.stock_names?.map(stock => stock['ticker'])
    const companies = stocks.stock_names?.map(stock => stock['company'])

    const resultNames = tickers?.map((ticker, company) => {
        return `${ticker}: ${companies[company]}`
    })

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const results = resultNames?.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()));

        setSearchResults(results);

        if (!results || searchTerm === '') {
            setSearchResults('')
        }
    }, [searchTerm, resultNames])

    return (
        <div className='searchbar-box'>
            <input
                type='text'
                name='search-bar'
                placeholder=' Search'
                value={searchTerm}
                onFocus={useEffect(() => {
                    dispatch(searchStocks())
                }, [dispatch])}
                onChange={e => setSearchTerm(e.target.value)}
                onBlur={() => setSearchResults('')}
                // autoComplete='off'
            />
            <div className='search-results'>
                <ul>
                    {searchResults.length > 0 && searchResults.map(item => (
                        <div className='search-items-dropdown'
                            onClick={() => {
                                setSearchTerm('')
                                history.push(`/stocks/${item.split(":")[0]}`)
                            }}
                        >
                            <NavLink to={`/stocks/${item.split(":")[0]}`}>{item}</NavLink>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SearchBar;
