# stock-market-dashboard ([visit](https://checkthemarket.onrender.com/))
This project is a clone of the [fey.com](www.fey.com) platform dashboard.
### Tech stacks used:
- Node.js
- React
- TailwindCSS

___
For stock market data, [Alpha Vantage](alphavantage.co) API has been used
(For rate limit seperately saved data fetched from the API has been used for now)

### Running Locally:
step 1: Clone the repo  
```bash
git clone <repo_url>
```
step 2: Install Node modules  
```bash
npm i
```
step 3: Add environment variable in **.env** inside root directory (not required while using sample data)   
```
VITE_API_KEY={your api key}
```
step 4: Run the script and follow the localhost link to run in development mode
```bash
npm run dev
```
