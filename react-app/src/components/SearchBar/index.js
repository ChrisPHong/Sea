import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { searchStocks } from '../../store/searchbar';
import './searchbar.css';

function SearchBar () {
    const dispatch = useDispatch();
    const history = useHistory();
    const stocks = useSelector(state => state.search.entries); // object
    // const stocks = useSelector(state => console.log('-----state----', state)); // object

    const tickers = stocks.stock_names?.map(stock => stock['ticker'])
    const companies = stocks.stock_names?.map(stock => stock['company'])

    const resultNames = tickers?.map((ticker, company) => {
        return `${ticker}: ${companies[company]}`
    })

    console.log('stocks object', stocks)
    console.log('array of tickers', tickers)
    console.log('array of companies', companies)
    console.log('kv pairs of ticker to company', resultNames)

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
                autoComplete='off'
            />
            <div className='search-results'>
                <ul>
                    {searchResults.length > 0 && resultNames.map(item => (
                        <div className='search-items-dropdown'
                        // key={}
                            onClick={() => {
                                setSearchTerm('')
                                history.push(`/stocks/${item.split(":")[0]}`)
                            }}
                        >{item}
                            <NavLink to={`/stocks/${item.split(":")[0]}`}>{item}</NavLink>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SearchBar;
