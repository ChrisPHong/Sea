import { Link } from 'react-router-dom';
import './AssetTable.css'

const AssetTable = ({ stocks, companies, transArr, currencyFormat, buyingTotal, closingPrices, closingPricesArr }) => {

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
                            transaction.type === 'buy' && transaction.shares > 0 &&
                            <Link to={`/stocks/${stocks[`${transaction.companyId}`]?.ticker}`}>
                                <tr className='body-row' key={transaction.id}>
                                    {/* -------------------- COMPANY SECTION -------------------- */}
                                    <td className='comp-title'>
                                        {companies.length !== 0 &&
                                        <>
                                            <div className='company-name'>
                                                {stocks[`${transaction.companyId}`].name}
                                            </div>
                                            <div className='company-ticker'>
                                                {stocks[`${transaction.companyId}`].ticker}
                                            </div>
                                        </>}
                                    </td>
                                    {/* -------------------- BALANCE SECTION -------------------- */}
                                    {/* Display bought transactions. If same company and transaction type is sell, then deduct from transaction buy that has the same companyId */}
                                    <td className='owned-balance'>
                                        <div className='owned-balance-price'>
                                            {closingPricesArr.length !== 0 && currencyFormat.format(closingPrices[transaction?.companyId]?.price * transaction.shares)}
                                             </div>
                                        <div className='owned-comp-shares'>{transaction.shares}</div>
                                    </td>
                                    {/* -------------------- PRICE SECTION -------------------- */}
                                    <td className='owned-comp-price'>
                                        <div className='curr-comp-price'>
                                            {currencyFormat.format(closingPrices[transaction?.companyId]?.price)}
                                        </div>
                                        {(((transaction.shares * (closingPrices[transaction?.companyId]?.price) - (transaction.price * transaction.shares)) / (transaction.price * transaction.shares))).toFixed(2) >= 0 ?
                                            <div className='curr-comp-percent' style={{ color: 'green' }}>+{((((transaction.shares * (closingPrices[transaction?.companyId]?.price) - (transaction.price * transaction.shares)) / (transaction.price * transaction.shares))) * 100).toFixed(2)}%</div>
                                            :
                                            <div className='curr-comp-percent' style={{ color: 'red' }}>{((((transaction.shares * (closingPrices[transaction?.companyId]?.price) - (transaction.price * transaction.shares)) / (transaction.price * transaction.shares))) * 100).toFixed(2)}%</div>}
                                    </td>
                                    {/* -------------------- ALLOCATION SECTION -------------------- */}
                                    <td className='owned-allocations'>
                                        <div className='allocation-percent'>
                                            {(((closingPrices[transaction?.companyId]?.price * transaction.shares) / buyingTotal()) * 100).toFixed(2)}%
                                        </div>
                                    </td>
                                </tr>
                            </Link>
                        ))}
                    </tbody>
                </table>}
            </div>
        </>
    )
}

export default AssetTable
