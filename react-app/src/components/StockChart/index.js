import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import './StockChart.css'

const StockChart = ({totalFunds, currentUser, setCurrPrice, data, getDatesAndPrices}) => {

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
            <div className='asset-chart'>
                <LineChart
                    width={950}
                    height={300}
                    data={data}
                    onMouseMove={(e) => lineMouseOver(e?.activePayload && e?.activePayload[0].payload.price)}
                >
                <XAxis dataKey="date" hide="true" />
                <YAxis dataKey="price" domain={['dataMin', 'dataMax']} hide="true" />
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
                        <button>1D</button>
                    </span>
                    <span className='weekly'>
                    <button>1W</button>
                    </span>
                    <span className='monthly'>
                    <button>1M</button>
                    </span>
                </div>
            </div>
        </>
    )
}

export default StockChart
