import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import './StockChart.css'

const StockChart = ({totalFunds, currentUser, transArr, companies, buyingTotal}) => {
    // const transArr = Object.values(transactions)
    const data = []
    const [timeframe, setTimeframe] = useState(7)
    const [newData, setNewData] = useState(data)
    // useEffect(() => {
    //     if (e.target.value === '1w') {
    //         getDatesAndPrices(7)
    //     } else if (e.target.value === '1m') {
    //         getDatesAndPrices(30)
    //     } else if (e.target.value === '3m') {
    //         getDatesAndPrices(90)
    //     }
    // }, [timeframe])

    useEffect(() => {
        getDatesAndPrices(timeframe)
    }, [timeframe])

    const getPurchasedShares = (companyId) => {
        for (let i = 0; i < transArr?.length; i++) {
            let transaction = transArr[i];
            if (transaction?.type === 'buy' && companyId === transaction?.companyId) {
                return transaction.shares
            }
        }
    }

    const getDatesAndPrices = (inc) => {
        let totalPrices = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]

        // Add up all the stock prices under each column
        for (let i = 0; i < companies.length; i++) {
            // let prices = companies[i].prices
            if (companies.length) {
                for (let j = 0; j < companies[i]?.prices?.length; j++) {
                    totalPrices[j] += (companies[i]?.prices[j] * getPurchasedShares(companies[i]?.id))
                }

            }
        }

        const date = new Date().getTime()
        const dateCopy = new Date(date)

        // Based on the number to increment by,
        // new dates will be created and will be added to data array along with the matching price
        for (let i = inc - 1; i >= 0; i--) {
            let newDate = dateCopy.setDate(dateCopy.getDate() - 1)
            if (totalPrices) {
                // Add to front of data array so that the most recent date and
                // price will be at the end and previous dates/price near the beginning
                data.unshift({
                    'date': new Date(newDate).toLocaleDateString('en-US', {month: 'long', day: 'numeric'}),
                    'price': totalPrices[i]
                })
            }
        }
        setNewData(data.slice(-inc))
    }
    const [currPrice, setCurrPrice] = useState(newData[newData.length - 1])

    const createData = (time) => {
        if (time === '1w') {
            setTimeframe(7)
            getDatesAndPrices(timeframe)
            console.log('data for one week', newData)
        } else if (time === '1m') {
            setTimeframe(30)
            getDatesAndPrices(timeframe)
            console.log('data for 1 month', newData)
        } else if (time === '3m') {
            setTimeframe(90)
            getDatesAndPrices(timeframe)
            console.log('data for 3 months', newData)
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
                    {currPrice !== '0.00' ? `$${currPrice}` : data[data.length - 1]?.price?.toFixed(2)}
                </div>
                <div className='balance-percent'>
                    {(buyingTotal() > totalFunds()) ?
                    <div className='all-time-diff' style={{color: 'green'}}>
                        +${Math.abs((buyingTotal() - totalFunds())).toFixed(2)}
                    </div>
                    :
                    <div className='all-time-diff' style={{color: 'red'}}>
                        -${Math.abs((buyingTotal() - totalFunds())).toFixed(2)}
                    </div>}
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
                <XAxis dataKey="date" />
                <YAxis dataKey="price" domain={['dataMin', 'dataMax']} />
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
                </div>
            </div>
        </>
    )
}

export default StockChart
