import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import { getPortfolio } from '../../store/portfolio';
import './StockChart.css'

const StockChart = ({currentUser, priceData, totalFunds}) => {
    // const transArr = Object.values(transactions)
    const dispatch = useDispatch()
    const [newData, setNewData] = useState(priceData)

    const [currPrice, setCurrPrice] = useState(newData[newData?.length - 1])

    // useEffect(() => {
    //     // dispatch(getPortfolio(currentUser?.id))
    // }, [dispatch])

    // Once priceData is fetched, display the one week graph.
    useEffect(() => {
        createData('1w')
    }, [priceData?.length])

    const createData = (time) => {
        if (time === '1y') {
            setNewData(priceData)
            return newData
        }
        if (time === '1w') {
            setNewData(priceData?.slice(-7))
            return newData
        }
        if (time === '1m') {
            setNewData(priceData?.slice(-30))
            return newData
        }
        if (time === '3m') {
            setNewData(priceData?.slice(-90))
            return newData
        }
        if (time === '6m') {
            setNewData(priceData?.slice(-(Math.floor(priceData?.length / 2))))
            return newData
        }
    }

    const lineMouseOver = (price) => {
        if (price) {
            setCurrPrice(price?.toFixed(2))
        }
    }

    // Customized tooltip to show price and date
    const customTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                <p className="tooltip-price">{`$${((payload[0].value)).toFixed(2)}`}</p>
                <p className="tooltip-date">{label}</p>
                </div>
            );
        }
        return null;
    }

    return (
        <>
            <div className='balance-info'>
                <div className='balance-label'>Balance</div>
                <div className='balance-amt'>
                    {/* {currPrice !== '0.00' ? `$${currPrice}` : data[data.length - 1]?.price?.toFixed(2)} */}
                </div>
                <div className='balance-percent'>
                    {/* {(buyingTotal() > totalFunds()) ? */}
                    <div className='all-time-diff' style={{color: 'green'}}>
                        {/* +${Math.abs((buyingTotal() - totalFunds())).toFixed(2)} */}
                    </div>
                    :
                    <div className='all-time-diff' style={{color: 'red'}}>
                        {/* -${Math.abs((buyingTotal() - totalFunds())).toFixed(2)} */}
                    </div>
                    {/* } */}
                    <div className='all-time'>All time</div>
                </div>
            </div>
            {/* -------------------- LINE CHART HERE -------------------- */}
            <div className='asset-chart'>
                <LineChart
                    width={950}
                    height={300}
                    data={newData}
                    onMouseMove={(e) => lineMouseOver(e?.activePayload && e?.activePayload[0].payload.price)}
                >
                <XAxis dataKey="date" hide='true' />
                {/* <YAxis dataKey="price" domain={['dataMin', 'dataMax']} hide='true' /> */}
                <YAxis dataKey="price" domain={['dataMin', 'dataMax']} hide='true' />
                <ReferenceLine y={totalFunds()} stroke="gray" strokeDasharray="3 3" />
                <Tooltip
                    cursor={false}
                    content={customTooltip}
                />
                    <Line
                        type="linear"
                        dataKey="price"
                        stroke="#0b7cee"
                        activeDot={{ r: 5 }}
                        dot={false}
                        animationDuration={500}
                        strokeWidth={2}
                    />
                </LineChart>
            </div>
            <div className='asset-bottom'>
                <div className='buying-power'>
                    Buying power: ${currentUser.balance}
                </div>
                <div className='asset-timeframe'>
                    <span className='weekly'>
                        <button
                            value='1w'
                            onClick={e => createData(e.target.value)}
                            >
                            1W
                        </button>
                    </span>
                    <span className='monthly'>
                        <button
                            value='1m'
                            onClick={e => createData(e.target.value)}
                            >
                            1M
                        </button>
                    </span>
                    <span className='three-months'>
                        <button
                            value='3m'
                            onClick={e => createData(e.target.value)}
                            >
                            3M
                        </button>
                    </span>
                    <span className='six-months'>
                        <button
                            value='6m'
                            onClick={e => createData(e.target.value)}
                            >
                            6M
                        </button>
                    </span>
                    <span className='one-year'>
                        <button
                            value='1y'
                            onClick={e => createData(e.target.value)}
                            >
                            1Y
                        </button>
                    </span>
                </div>
            </div>
        </>
    )
}

export default StockChart
