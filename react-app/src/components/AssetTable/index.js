import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import { getPortfolio } from '../../store/portfolio';
import './AssetTable.css'

const AssetTable = ({ nameTickerArr, transArr, closingPrice, currencyFormat, assetBalance, buyingTotal }) => {
    return (
        <>
            <div className='owned-assets'>
            {transArr &&
                <table>
                    <thead className='dashboard-header'>
                        <tr>
                            <div className='portfolio-theaders'>
                                <th className='owned-comp-label'>Company</th>
                                <th className='owned-shares-label'>Balance</th>
                                <th className='owned-price-label'>Price</th>
                                <th className='owned-allocations-label'>Allocation</th>
                            </div>
                        </tr>
                    </thead>
                    <tbody className='dashboard-body'>
                        <tr className='body-row'>
                            {/* -------------------- COMPANY SECTION -------------------- */}
                            <td>
                                {nameTickerArr && nameTickerArr.map((comp, i) => (
                                    <div key={i} className='comp-title'>
                                        <div className='company-name'>
                                            {comp.name}
                                        </div>
                                        <div className='company-ticker'>
                                            {comp.ticker}
                                        </div>
                                    </div>
                                ))}
                            </td>
                            {/* -------------------- BALANCE SECTION -------------------- */}
                            <td>
                                {assetBalance && assetBalance.map((balance, i) => (
                                    <div key={i} className='owned-balance'>
                                        <div className='owned-balance-price'>{currencyFormat.format(balance.total)}</div>
                                        <div className='owned-comp-shares'>{balance.shares}</div>
                                    </div>
                                ))}
                            </td>
                            {/* -------------------- PRICE SECTION -------------------- */}
                            <td>
                                {closingPrice && closingPrice.map((price, i) => (
                                    <div key={i} className='owned-comp-price'>
                                        <div className='curr-comp-price'>
                                            {currencyFormat.format(price.closingPrice)}
                                        </div>
                                        {(((price.shares * (price.closingPrice) - (price.buyingPrice * price.shares)) / (price.buyingPrice * price.shares))).toFixed(2) >= 0 ?
                                            <div className='curr-comp-percent' style={{ color: 'green' }}>+{(((price.shares * (price.closingPrice) - (price.buyingPrice * price.shares)) / (price.buyingPrice * price.shares))).toFixed(2)}%</div>
                                            :
                                            <div className='curr-comp-percent' style={{ color: 'red' }}>{(((price.shares * (price.closingPrice) - (price.buyingPrice * price.shares)) / (price.buyingPrice * price.shares))).toFixed(2)}%</div>}
                                    </div>
                                ))}
                            </td>
                            {/* -------------------- ALLOCATION SECTION -------------------- */}
                            <td className='owned-allocations'>
                                {closingPrice && closingPrice.map((price, i) => (
                                    <div key={i} className='allocation-percent'>
                                        {(((price.closingPrice * price.shares) / buyingTotal()) * 100).toFixed(2)}%
                                    </div>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </table>}
            </div>
        </>
    )
}

export default AssetTable
