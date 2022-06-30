// to be copied and pasted into Stock Details page and StockDetails.css

// JS - buy/sell container
import { stockTransaction } from "../../store/transactions";
import Buy from './Buy';
import Sell from './Sell';
import { useState } from "react";


const Headers = ({ titles, currentTab, selectTab }) => {
    const handleClick = (e) => {
        const index = parseInt(e.target.id, 10);
        selectTab(index);
    }
    const tabs = titles.map((title, index) => {
        const headerClass = (index === currentTab) ? 'active' : '';
        return (
            <li
                key={index}
                id={index}
                onClick={handleClick}
                className={headerClass}
            >
                {title}
                {/* Buy / Sell tab toggle titles */}
            </li>
        );
    });
    return (
        <ul className='tab-header'>
            {tabs}
        </ul>
    );
}

const [currentTab, setCurrentTab] = useState(0); // 0 = buy tab; 1 = sell tab

// in the return
<div className='fixed-side-container'>
    <div className='buy-sell-container'>
        <section className="buy-sell">
            <div id='tabs'>
                <Headers
                    titles={titles}
                    currentTab={currentTab}
                    selectTab={setCurrentTab}
                />
                <div className="tab-toggle-content">
                {currentTab === 0 && <Buy user={user} price={closePrice} />}
                {currentTab === 1 && <Sell user={user} price={closePrice} shares={userShares} />}
                </div>
            </div>
        </section>
        <section className="">
            {/* watchlist? */}
        </section>
    </div>
</div>



// CSS
