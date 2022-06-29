import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneStock } from '../../store/stock';
import './StockDetails.css'

const StockDetails = () => {
    const dispatch = useDispatch()
    const { ticker } = useParams()
    console.log(ticker.toUpperCase())
    const stock = useSelector(state => state?.stock?.entries[ticker.toUpperCase()])
    console.log(stock)

    // getting stocks from backend
    useEffect(() => {
        if (stock === undefined) {
            dispatch(getOneStock(ticker))
        }
    }, [dispatch, stock])

    return (
        <>
            <h1>Welcome to the stock details page</h1>
            <h2>Hello</h2>
            <h2>Hello</h2>
            {stock &&
                <div>
                    {stock.basePrice}
                    {stock.ceo}
                    {stock.description}
                    {stock.employees}
                    {stock.founded}
                    {stock.headquarters}
                    {stock.name}
                    {stock.ticker}
                </div>
            }

        </>
    )

}

export default StockDetails
