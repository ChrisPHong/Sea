import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import { getPortfolio } from '../../store/portfolio';
import './AssetTable.css'

const AssetTable = ({ currentUser, compNameArr, stocks, transArr }) => {
    console.log('hey bro im in asset table can you just print already', compNameArr)
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
                            {compNameArr && compNameArr.map((name, i) => (
                                <td key={i} className='owned-comp-name'>
                                    <div className='company-name'>
                                        {name}
                                    </div>
                                    {/* <div className='company-ticker'>
                                        {matchTicker(transaction.companyId)}
                                    </div> */}
                                </td>
                            ))}
                            {/* -------------------- BALANCE SECTION -------------------- */}
                            {/* <td className='owned-balance'>
                                <div className='owned-balance-price'>{currencyFormat.format(transaction?.shares * closingPriceAndSumUp(transaction))}</div>
                                <div className='owned-comp-shares'>{transaction.shares}</div>
                            </td> */}
                            {/* -------------------- PRICE SECTION -------------------- */}
                            {/* <td className='owned-comp-price'>
                                <div className='curr-comp-price'>{currencyFormat.format(closingPrice(transaction?.companyId))}</div>
                                {(((transaction.shares * (closingPrice(transaction.companyId)) - (transaction.price * transaction.shares)) / (transaction.price * transaction.shares))).toFixed(2) >= 0 ?
                                    <div className='curr-comp-percent' style={{ color: 'green' }}>+{(((transaction.shares * (closingPrice(transaction.companyId)) - (transaction.price * transaction.shares)) / (transaction.price * transaction.shares))).toFixed(2)}%</div>
                                    :
                                    <div className='curr-comp-percent' style={{ color: 'red' }}>{(((transaction.shares * (closingPrice(transaction.companyId)) - (transaction.price * transaction.shares)) / (transaction.price * transaction.shares))).toFixed(2)}%</div>}
                            </td> */}
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
