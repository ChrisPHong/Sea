# Sea

Sea is a Robinhood clone that allow users to experience a mock-up of the American financial market through trading a variety of stocks under the S&P 500 Index. Users will be able to buy or sell stocks at varying prices and keep track of their savings. Users will also be able to create, edit, and delete their own personalized watchlists to surveil stocks of interest. Users can also add more money into their balance to increase their buying power.

## Link to Live Site
Live Link: https://sea-coin.herokuapp.com/

## Technologies Used:
### Front End
![react](https://user-images.githubusercontent.com/90019010/179418431-3768ece7-d988-43f1-a22b-4707848ac9d2.svg)
![redux](https://user-images.githubusercontent.com/90019010/179418433-e3ae4f1d-a1dc-4772-84b7-56db8132d01e.svg)
![javascript](https://user-images.githubusercontent.com/90019010/179418437-d00f3585-d6a9-4531-af2f-e5cb321e2780.svg)
![html](https://user-images.githubusercontent.com/90019010/179418445-20d38d75-eae7-4bbf-bed0-5c26ec4aa977.svg)
![css](https://user-images.githubusercontent.com/90019010/179418447-fd17f92e-83e6-4e60-b4d6-602b8300bdc9.svg)
![heroku](https://user-images.githubusercontent.com/90019010/179418448-91d1d47f-1184-440a-bcd0-03f36192f775.svg)

### Back End
![python](https://user-images.githubusercontent.com/90019010/179418459-28523cdb-5d46-4473-a744-efcf2bb47c8d.svg)
![flask](https://user-images.githubusercontent.com/90019010/179418464-dac29f71-39ae-425b-bbc7-86e6dd29098b.svg)
![postgres](https://user-images.githubusercontent.com/90019010/179418482-fca795c5-b035-43e6-91cb-c136d0c9f6fb.svg)
![docker](https://user-images.githubusercontent.com/90019010/180459609-e8cd6ead-1cd3-4c23-a50c-d44f672212fb.svg)

## Screenshots

### Splash Page
![seasplash](https://user-images.githubusercontent.com/96046451/182521846-e3713244-349e-4e0e-b0a0-ae384904fdbb.PNG)

### Log-In Page
![sealogin](https://user-images.githubusercontent.com/96046451/182521865-1e3fb20f-2431-4a3a-90bc-5a4aadccf7c5.PNG)

### Sign-In Page
![seasignup](https://user-images.githubusercontent.com/96046451/182521875-ef58e20b-c199-4038-bd09-e79ed0843d31.PNG)

### Home Page
![seahome](https://user-images.githubusercontent.com/96046451/182521878-58fbe6ff-c7cd-4790-b393-af92963e503a.PNG)

## Features
https://github.com/ChrisPHong/Sea/wiki/Features-List

## Database Schema
https://github.com/ChrisPHong/Sea/wiki/Database-Schema

## Front-End Routes Document
https://github.com/ChrisPHong/Sea/wiki/FrontEnd-Routes

## Back-End Routes Document
https://github.com/ChrisPHong/Sea/wiki/Backend-Routes

## Technical Implementation Details
The most challenging aspect of this project was deciding how to get the stock prices for each individual company. We were initially going to go with a third party API to fetch the stock prices for each company but realized there was an API fetch call limit. So we ended up giving a custom base price for each company and create a function in the back-end server to generate custom stock prices. The downside was that it did not reflect real-time stock prices but it was a more reliable way of getting the stock prices. We ended up using the third party API to fetch real-time news for the American Stock Market as well as each company to enhance user's experience. 

Random Stock Prices Generator Function
![seacustompricesfunction](https://user-images.githubusercontent.com/96046451/182523607-c4771e68-35d6-4b22-9cba-782766d16bc9.PNG)

Third Party News API - Finnhub.io
![seanewsapi](https://user-images.githubusercontent.com/96046451/182524948-6b283550-4c2b-4686-a147-2395d8e7c8fa.PNG)

## Portfolio
A signed in user will have access to their portfolio with all the current stocks that they own. They will be able to see their total balance, how much each stock was worth, and how many shares of each stock they own. Users will also have access to all their personal watchlists as well as any news relating to the American Stock Market.

## Stock Detail
***DISCLAIMER: ALL PRICES SEEN UNDER EACH STOCK ARE FAKE DATA. OUR PRICES DO NOT REFLECT THE PRICES OF THE ACTUAL AMERICAN STOCK MARKET AND SHOULD NOT BE USED AS A REFERENCE WHEN INVESTING.***

Stock detail consists of the following information under each company:
- Name
- Ticker
- Description of the company
- CEO
- Number of Employees
- Headquarters
- Year the company was founded
- High price
- Low price
- Open price
- Closing price
- Chart of the daily, weekly, and monthly prices of a specific stock.
- Company News

## Watchlist
A signed in user will be able to create a watchlist and add certain stocks that they would like to closely monitor. They will also be able to edit the name of the watchlist, as well as remove a stock from the watchlist. Additionally, a user will have the ability to completely delete an entire watchlist, which will, in turn, remove all stocks that were associated with that watchlist.

## Stock Search
A user will be able to look up the top 40 companies under the S&P 500 at the time of writing this. Search endpoints will appear as a user continues to type in the search bar for a specific stock/company.

## Future Features
- Reliable third-party API for stock prices to reflect real-time prices
- Users can have more than one portfolio to organize stocks into categories
