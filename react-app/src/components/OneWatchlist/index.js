import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import { getWatchlists, editWatchlists, deleteWatchList, deleteStockWatchlists, getWatchlistPrices } from '../../store/watchlist'
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import EditWatchListForm from '../EditWatchListForm'
import '../Watchlist';
import '../EditWatchListForm/EditWatchListForm.css';

function OneWatchlist({ watchlist, currencyFormat }) {
    const dispatch = useDispatch();
    const assetPrices = useSelector(state => state?.portfolio?.prices)
    const watchlistPrices = useSelector(state => state?.watchlist?.prices)
    const stocks = useSelector(state => state?.stock?.entries)
    const [display, setDisplay] = useState(false);

    // from EditWatchlistForm index.js
    const history = useHistory()
    const id = watchlist.id
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(false)
    const lists = useSelector((state) => Object.values(state.watchlist));
    const watchlists = Object.values(lists[0])
    const watchlistNames = watchlists.map((watchlist) => {
        return watchlist.name
    })
    let userId = useSelector((state) => state.session?.user?.id)

    useEffect(()=>{
        setName(watchlist.name)
    },[])
    useEffect(() => {
        const error = [];
        if (name.length > 100) error.push('Watchlist name must be less than 100 characters')
        if (name?.length < 1) error.push('Watchlist name must be at least 1 character')
        // if (watchlistNames.includes(name)) error.push('Provide a unique name')
        setErrors(error);
    }, [name])

    useEffect(() => {
        dispatch(getWatchlists())
        dispatch(getWatchlistPrices())
    }, [dispatch])

    const settingDisplay = () =>{
        if(display === false){
            setDisplay(true);
        } else{
            setDisplay(false);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (errors.length > 0) {
            setShow(true)
            return
        }
        if (errors.length === 0) {
            const payload = {
                id,
                userId,
                name,
            }
            const data = await dispatch(editWatchlists(payload))
            if(data){
                let error = []
                error.push(data)
                setErrors(error)
                setShow(true)
                return
            }
            setDisplay(false)

        }

    }
    useEffect(() => {

    }, [onSubmit])

    const onCancel = async (e) => {
        e.preventDefault();
        setDisplay(false);
        setName(watchlist.name);
    }


    return (
        <div key={watchlist.id} className='watchlist'>
            <div className='OneWatchListDiv'>
                <div className='watchlistButtonsEditAndDelete'>
                    <div className='titleWatchlistDiv'>
                        {/* <div className='watchlist-name-edit-delete-div'> */}
                            <div className='title-and-delete-btn'>
                                <p className='watchlistName'>{watchlist.name}</p>
                                <button
                                    className={`editButton ${watchlist.id}`}
                                    onClick={async (e) => {
                                        settingDisplay()
                                    }
                                    }
                                >
                                    <img className={`editingPicture ${watchlist.id}`} src={'https://cdn-icons-png.flaticon.com/512/61/61456.png'} />
                                </button >
                                <button
                                    className='deleteButton'
                                    onClick={async () => {
                                        console.log(watchlist, "<<<<<<<<<<<<<<< WATCHLIST")
                                        await dispatch(deleteWatchList(watchlist.id))
                                        await dispatch(getWatchlists())
                                    }}
                                >
                                    <img className='deletePicture' src={'https://www.iconpacks.net/icons/1/free-trash-icon-347-thumb.png'} />
                                </button>
                            </div>
                            <div className='editBtnDiv'>
                                {display ?
                                <>
                                    <form className={`WatchlistForm-${id}`} onSubmit={onSubmit} style={{width: '100%'}}>
                                        {show ?
                                            errors.length > 0 ?
                                                <>
                                                    {errors.map((error, ind) => {
                                                        return (
                                                            <>
                                                                <p className='edit-watchlist-error-message'
                                                                    key={ind}>{error}</p>
                                                            </>
                                                        )
                                                    })}
                                                </>
                                                : null
                                            : null}
                                        <div className='nameInput'>
                                            <input type='text'
                                                required
                                                className='inputBox'
                                                placeholder='Watchlist Name'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className='cancel-save-btns'>
                                            <button className='cancel-watchlist-edit' onClick={onCancel}>Cancel</button>
                                            <button
                                                className='submitButton'
                                                type='submit'
                                            >Save</button>
                                        </div>
                                    </form>
                                    {/* <EditWatchListForm watchlist={watchlist} names={watchlist.name} />
                                    <button className='submitButton' type='submit' onClick={settingDisplay}>Save Changes</button>
                                    <button className='cancel-watchlist-edit' onClick={settingDisplay}>Cancel</button> */}
                                </>
                                : null
                                }
                            </div>
                        {/* </div> */}
                    </div>

                    <div className='company'>
                        {watchlist.watchComps.map((company) => {
                            return (
                                <div key={company.id} className={`company-${company.id} divCompanyPriceAndGraph`}>
                                    <NavLink className='navLinkStocksWatchlist' to={`/stocks/${company.ticker}`}>
                                        {company.ticker}
                                    </NavLink>
                                    <div className='asset-chart'>
                                        <LineChart
                                            width={50}
                                            height={35}
                                            data={watchlistPrices[company.id]}
                                        >
                                            <XAxis dataKey="date" hide='true' />
                                            <YAxis dataKey="price" domain={['dataMin', 'dataMax']} hide='true' />
                                            <Line
                                            type="linear"
                                            dataKey="price"
                                            stroke="#0b7cee"
                                            activeDot={{ r: 5 }}
                                            dot={false}
                                            strokeWidth={2}
                                            />
                                        </LineChart>
                                    </div>
                                    <h5 className='companyStockClosingPrice'>
                                        {currencyFormat.format(watchlistPrices[company.id]?.slice(-1)[0].price)}
                                    </h5>
                                    <button className='deleteButton'
                                        onClick={async (e) => {
                                            const payload = {
                                                watchlistId: watchlist.id,
                                                ticker: company.ticker
                                            }
                                            await dispatch(deleteStockWatchlists(payload))
                                            // await dispatch(getWatchlists())
                                        }}
                                    >
                                        <img className='deletePicture' src={'https://www.iconpacks.net/icons/1/free-trash-icon-347-thumb.png'} />
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default OneWatchlist;
