import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { searchStocks } from '../../store/searchbar';
import StockDetails from '../StockDetails';
import { loadOneStock, getOneStock, getStockPrices } from '../../store/stock';
import './searchbar.css';

function SearchBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const stocks = useSelector(state => state?.search?.entries); // object
    // console.log('component', stocks)
    // const stocks = useSelector(state => console.log('-----state----', state)); // object
    // const load_stocks = useSelector(state => state?.stock?.entries);

    const tickers = stocks.stock_names?.map(stock => stock['ticker'])
    const companies = stocks.stock_names?.map(stock => stock['company'])

    const resultNames = tickers?.map((ticker, company) => {
        return `${ticker}: ${companies[company]}`
    })

    // console.log('stocks object', stocks)
    // console.log('array of tickers', tickers)
    // console.log('array of companies', companies)
    // console.log('kv pairs of ticker to company', resultNames)

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    useEffect(() => {
        const results = resultNames?.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()));

        setSearchResults(results);

        if (!results || searchTerm === '') {
            setSearchResults('')
        }
    }, [searchTerm])


    useEffect(() => {
        dispatch(searchStocks())
    }, [dispatch])

    // getting stocks from backend
    // useEffect(() => {
    //     dispatch(getOneStock(ticker))
    // }, [dispatch])



    // map thru searchresults, console.log(item)
    //  Object.keys(item)[0]
    // searchResults.map(item => {
    //     console.log(item)
    //     return ''
    // })
    // console.log(searchResults) // array of list results
    // item = each item in that array
    // Object.keys(item[0])
    // item.split(":")[0]

    // const handleSearchInput = (e) => {
    //     setSearchTerm(e);
    //     const results = resultNames?.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()));
    //     setSearchResults(results);

    //     if (!results || searchTerm === '') {
    //         setSearchResults('')
    //     }
    // }

    return (
        <div className='searchbar-box'>
            <input
                type='text'
                name='search-bar'
                placeholder=' Search'
                // onFocus={searchStocks()}
                onChange={e => setSearchTerm(e.target.value)}
                onBlur={() => setSearchResults('')}
                value={searchTerm}
            />
            <div className='search-results'>
                <ul>
                    {searchResults?.length > 0 && searchResults?.map(item => (
                        // searchResults ===> ['MSFT: Microsoft Corporation', 'META: Meta Platforms, Inc', 'CSCO: Cisco Systems Inc.']
                        <div className='search-items-dropdown'
                            key={item}
                            onMouseDown={() => {
                                setSearchTerm('')
                                setSearchResults([])
                                // await dispatch(getOneStock(item.split(":")[0]))
                                history.push(`/stocks/${item.split(":")[0]}`)
                            }}
                        >
                            {/* <span><NavLink to={`/stocks/${item.split(":")[0]}`}>{<StockDetails ticker={item.split(":")[0]}/>}</NavLink></span> */}
                            <p>{item}</p>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SearchBar;
