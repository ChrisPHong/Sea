import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import { getPortfolio } from '../../store/portfolio';
import './AssetTable.css'

const AssetTable = ({ currentUser, nameTickerArr, stocks, transArr, closingPrice, currencyFormat }) => {
    return (
        <>
            <div className='owned-assets'>
            {transArr?.length ?
                <table>
                    <thead>
                        <tr>
                            <th className='owned-comp-label'>Company</th>
                            <th className='owned-shares-label'>Balance</th>
                            <th className='owned-price-label'>Price</th>
                            <th className='owned-allocations-label'>Allocation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/* -------------------- COMPANY SECTION -------------------- */}
                            {nameTickerArr && nameTickerArr.map((comp, i) => (
                                <td key={i} className='owned-comp-name'>
                                    <div className='company-name'>
                                        {comp.name}
                                    </div>
                                    <div className='company-ticker'>
                                        {comp.ticker}
                                    </div>
                                </td>
                            ))}
                            {/* -------------------- BALANCE SECTION -------------------- */}
                            {/* <td className='owned-balance'>
                                <div className='owned-balance-price'>{currencyFormat.format(transaction?.shares * closingPriceAndSumUp(transaction))}</div>
                                <div className='owned-comp-shares'>{transaction.shares}</div>
                            </td> */}
                            {/* -------------------- PRICE SECTION -------------------- */}
                            {closingPrice && closingPrice.map((price, i) => (
                                <td key={i} className='owned-comp-price'>
                                    <div className='curr-comp-price'>
                                        {currencyFormat.format(price.closingPrice)}
                                    </div>
                                    {(((price.shares * (price.closingPrice) - (price.buyingPrice * price.shares)) / (price.buyingPrice * price.shares))).toFixed(2) >= 0 ?
                                        <div className='curr-comp-percent' style={{ color: 'green' }}>+{(((price.shares * (price.closingPrice) - (price.buyingPrice * price.shares)) / (price.buyingPrice * price.shares))).toFixed(2)}%</div>
                                        :
                                        <div className='curr-comp-percent' style={{ color: 'red' }}>{(((price.shares * (price.closingPrice) - (price.buyingPrice * price.shares)) / (price.buyingPrice * price.shares))).toFixed(2)}%</div>}
                                </td>
                            ))}
                            {/* -------------------- ALLOCATION SECTION -------------------- */}
                            {/* <td className='owned-allocations'>
                                {(((closingPrice(transaction.companyId) * transaction.shares) / buyingTotal()) * 100).toFixed(2)}%</td> */}
                        </tr>
                    </tbody>
                </table>
                :
                <p>You do not have any stocks!</p>}
            </div>
        </>
    )
}

export default AssetTable
