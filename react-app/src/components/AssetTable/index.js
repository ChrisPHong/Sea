import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import { getPortfolio } from '../../store/portfolio';
import { Link } from 'react-router-dom';
import './AssetTable.css'

const AssetTable = ({ nameTickerArr, stocks, assetPrices, transArr, closingPrice, currencyFormat, assetBalance, buyingTotal }) => {

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
                        {transArr && transArr.map(transaction => (
                            transaction.type === 'buy' &&
                            <tr className='body-row' key={transaction.id}>
                                {/* -------------------- COMPANY SECTION -------------------- */}
                                <td className='comp-title'>
                                    <div className='company-name'>
                                        {<Link to={`/stocks/${stocks[`${transaction.companyId}`]?.ticker}`}>{stocks[`${transaction.companyId}`].name}</Link>}
                                    </div>
                                    <div className='company-ticker'>
                                        {stocks[`${transaction.companyId}`].ticker}
                                    </div>
                                    {/* {nameTickerArr && nameTickerArr.map((comp, i) => (
                                        <div key={i} className='comp-title'>
                                            <div className='company-name'>
                                                <Link to={`/stocks/${comp.ticker}`}>{comp.name}</Link>
                                            </div>
                                            <div className='company-ticker'>
                                                {comp.ticker}
                                            </div>
                                        </div>
                                    ))} */}
                                </td>
                                {/* -------------------- BALANCE SECTION -------------------- */}
                                {/* Display bought transactions. If same company and transaction type is sell, then deduct from transaction buy that has the same companyId */}
                                <td className='owned-balance'>
                                    {/* <div className='owned-balance-price'>
                                        {(transaction.type === 'sell' && transaction.companyId) === (transaction.companyId)
                                        ? currencyFormat.format(assetPrices[`${transaction.companyId}`]['364'] * transaction.shares - transaction.price * transaction.shares)
                                        : currencyFormat.format(assetPrices[`${transaction.companyId}`]['364'] * transaction.shares)}</div>
                                    <div className='owned-comp-shares'>{transactiontransaction.shares}</div> */}
                                    {/* {assetBalance && assetBalance.map((balance, i) => (
                                        <div key={i} className='owned-balance'>
                                            <div className='owned-balance-price'>{currencyFormat.format(balance.total)}</div>
                                            <div className='owned-comp-shares'>{balance.shares}</div>
                                        </div>
                                    ))} */}
                                </td>
                                {/* -------------------- PRICE SECTION -------------------- */}
                                <td className='owned-comp-price'>
                                    {/* <div className='curr-comp-price'>
                                        {currencyFormat.format(assetPrices[`${transaction.companyId}`]['364'].price)}
                                    </div>
                                    {(((transaction.shares * (assetPrices[`${transaction.companyId}`]['364'].price) - (transaction.price * transaction.shares)) / (transaction.price * transaction.shares))).toFixed(2) >= 0 ?
                                        <div className='curr-comp-percent' style={{ color: 'green' }}>+{(((transaction.shares * (assetPrices[`${transaction.companyId}`]['364'].price) - (transaction.price * transaction.shares)) / (transaction.price * transaction.shares))).toFixed(2)}%</div>
                                        :
                                        <div className='curr-comp-percent' style={{ color: 'red' }}>{(((transaction.shares * (assetPrices[`${transaction.companyId}`]['364'].price) - (transaction.price * transaction.shares)) / (transaction.price * transaction.shares))).toFixed(2)}%</div>} */}

                                    {/* {closingPrice && closingPrice.map((price, i) => (
                                        <div key={i} className='owned-comp-price'>
                                            <div className='curr-comp-price'>
                                                {currencyFormat.format(price.closingPrice)}
                                            </div>
                                            {(((price.shares * (price.closingPrice) - (price.buyingPrice * price.shares)) / (price.buyingPrice * price.shares))).toFixed(2) >= 0 ?
                                                <div className='curr-comp-percent' style={{ color: 'green' }}>+{(((price.shares * (price.closingPrice) - (price.buyingPrice * price.shares)) / (price.buyingPrice * price.shares))).toFixed(2)}%</div>
                                                :
                                                <div className='curr-comp-percent' style={{ color: 'red' }}>{(((price.shares * (price.closingPrice) - (price.buyingPrice * price.shares)) / (price.buyingPrice * price.shares))).toFixed(2)}%</div>}
                                        </div>
                                    ))} */}
                                </td>
                                {/* -------------------- ALLOCATION SECTION -------------------- */}
                                <td className='owned-allocations'>
                                    <div className='allocation-percent'>
                                        {(((assetPrices[`${transaction.companyId}`]['364'].price * transaction.shares) / buyingTotal()) * 100).toFixed(2)}%
                                    </div>
                                    {/* {closingPrice && closingPrice.map((price, i) => (
                                        <div key={i} className='allocation-percent'>
                                            {(((price.closingPrice * price.shares) / buyingTotal()) * 100).toFixed(2)}%
                                        </div>
                                    ))} */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>
        </>
    )
}

export default AssetTable
