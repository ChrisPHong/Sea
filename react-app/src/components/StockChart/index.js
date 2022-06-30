import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import './StockChart.css'

const StockChart = ({totalFunds, currentUser, transArr, companies, buyingTotal}) => {
    // const transArr = Object.values(transactions)
    const data = []
    const [timeframe, setTimeframe] = useState(7)
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
        setTimeframe(7)
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
        const dataObj = {}
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

        // console.log('what is this date', date.getDate())
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
        data.push(dataObj)
        return data
    }
    const [currPrice, setCurrPrice] = useState(data[data.length - 2]?.price?.toFixed(2))


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
                    {currPrice !== '0.00' ? `$${currPrice}` : data[data.length - 2]?.price?.toFixed(2)}
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
                    data={getDatesAndPrices(timeframe)}
                    onMouseMove={(e) => lineMouseOver(e?.activePayload && e?.activePayload[0].payload.price)}
                >
                <XAxis dataKey="date"  />
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
                    <span className='daily'>
                        <button
                            value='1w'
                            // onClick={setTimeframe(7)}
                            >
                            1W
                        </button>
                    </span>
                    {/* <span className='weekly'>
                        <button
                            value='1m'
                            onClick={setTimeframe(30)}
                            >
                            1M
                        </button>
                    </span>
                    <span className='monthly'>
                        <button
                            value='3m'
                            onClick={setTimeframe(90)}
                            >
                            3M
                        </button>
                    </span> */}
                </div>
            </div>
        </>
    )
}

export default StockChart
