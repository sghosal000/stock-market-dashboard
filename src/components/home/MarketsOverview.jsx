import React, { useState, useEffect } from 'react'
import axios from '../../api/axios';
import useData from '../../hooks/useData';
import { processData } from '../../utils/processData';
import LineChart from '../charts/LineChart';

import LoadingMarketsOverview from '../loading/LoadingMarketsOverview';

import { testIndicesData, testSPYIntraday, testSPYDaily } from '../charts/data/data';

const MarketsOverview = () => {
    const apikey = import.meta.env.VITE_API_KEY
    const apikey1 = import.meta.env.VITE_API_KEY1

    const indices = [
        {
            index: 'S&P 500',
            name: 'SPDR S&P 500 ETF Trust',
            symbol: 'SPY',
        },
        {
            index: 'Nasdaq',
            name: 'Invesco QQQ Trust Series 1',
            symbol: 'QQQ'
        },
        {
            index: 'Dow Jones',
            name: 'SPDR Dow Jones Industrial Average ETF Trust',
            symbol: 'DIA'
        },
        {
            index: 'Russell 2000',
            name: 'iShares Russell 2000 ETF',
            symbol: 'IWM'
        },
        {
            index: 'Crude Oil',
            name: 'West Texas Intermediate Crude oil',
            symbol: 'WTI'
        },
        {
            index: 'Gold',
            name: 'XAU USD | Gold Spot US Dollar',
            symbol: 'XAUUSD'
        },
        {
            index: 'Silver',
            name: 'XAG USD | Silver Spot US Dollar',
            symbol: 'XAGUSD'
        },
        {
            index: 'Bitcoin',
            name: 'Bitcoin',
            symbol: 'BTC'
        }
    ]

    const frames = ['1D', '1W', '1M', '3M', '1Y', '5Y', 'ALL']

    const { activeTab } = useData()

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedFrame, setSelectedFrame] = useState('1D')

    // stores current Index data only
    const [indicesData, setIndicesData] = useState([])
    // stores intraday time series data raw
    const [indexDataINtraday, setIndexDataIntraday] = useState([])
    // stores daily time series data raw
    const [indexDataDaily, setIndexDataDaily] = useState([])
    // stores processed time series data, processed as per time frame selected
    const [indexData, setIndexData] = useState([])

    const [marketStatus, setMarketStatus] = useState('')

    const [loading, setLoading] = useState(true)
    const [loadingChart, setLoadingChart] = useState(true)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const parse = (data) => parseFloat(data).toFixed(2)

    const fetchIndicesData = async () => {
        setLoading(true)

        try {
            const fetchPromises = indices.map(async ({ index, symbol }, ind) => {
                if (['XAUUSD', 'XAGUSD'].includes(symbol)) {
                    const res = await axios.get(`/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikey}`);

                    // Yeah api access limit reached.. Gareeb hai hum :)
                    if (!res.data['Global Quote']) {
                        console.log(`Loading test data for ${index} instead...`);
                        return { name: index, data: testIndicesData[ind].data }
                    }
                    return { name: index, data: res.data['Global Quote'] }
                }
                const res = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apikey1}`);
                res.data['Global Quote'] = {
                    "01. symbol": symbol,
                    "02. open": res.data.o,
                    "03. high": res.data.h,
                    "04. low": res.data.l,
                    "05. price": res.data.c,
                    "06. volume": "660",
                    "07. latest trading day": "",
                    "08. previous close": res.data.pc,
                    "09. change": res.data.d,
                    "10. change percent": res.data.dp
                }
                return { name: index, data: res.data['Global Quote'] }
            })

            const results = await Promise.all(fetchPromises)
            setIndicesData(results);
            // console.log(results);

            // setIndicesData(testIndicesData)
        } catch (error) {
            console.error(error);
            setErrorMessage("Error Loading Data. Please try again later...");
        } finally {
            setLoading(false)
        }
    }

    const fetchIndexData = async (symbol) => {
        setLoadingChart(true)
        setDataLoaded(false)

        try {
            const resMarketStatus = await axios.get(`https://finnhub.io/api/v1/stock/market-status?exchange=US&token=${apikey1}`)
            setMarketStatus(resMarketStatus.data)

            const resIntraday = await axios.get(`/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&outputsize=full&apikey=${apikey}`);
            // Yeah api access limit reached.. Gareeb hai hum :)
            if (!resIntraday.data["Time Series (5min)"]) {
                console.log(`Loading test data for ${indices[selectedIndex].index} instead...`);
                setIndexDataIntraday(testSPYIntraday)
                setIndexDataDaily(testSPYDaily)
                return
            } else {
                setIndexDataIntraday(resIntraday.data);
            }
            const resDaily = await axios.get(`/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${apikey}`);
            // Yeah api access limit reached.. Gareeb hai hum :)
            if (!resDaily.data["Time Series (Daily)"]) {
                console.log(`Loading test data for ${indices[selectedIndex].index} instead...`);
                setIndexDataIntraday(testSPYIntraday)
                setIndexDataDaily(testSPYDaily)
                return
            } else {
                setIndexDataDaily(resDaily.data);
            }

            // setIndexDataIntraday(testSPYIntraday)
            // setIndexDataDaily(testSPYDaily)
        } catch (error) {
            console.error(error);
            setErrorMessage("Error Loading Data. Please try again later...");
        } finally {
            setLoadingChart(false)
            setDataLoaded(true)
        }
    };

    useEffect(() => {
        fetchIndicesData()
    }, [activeTab]);

    // when an index is selected corresponding time series data is loaded
    useEffect(() => {
        fetchIndexData(indices[selectedIndex].symbol)
    }, [activeTab, selectedIndex])

    // when a timeframe is selected the corressponding data is procssed to be rendered
    useEffect(() => {
        try {
            if (dataLoaded) {
                if (['1D', '1W', '1M'].includes(selectedFrame)) {
                    setIndexData(processData(indexDataINtraday, selectedFrame))
                } else {
                    setIndexData(processData(indexDataDaily, selectedFrame))
                }
            }
        } catch (error) {
            console.error(error)
            setErrorMessage("Error processing data.. Please try again later...")
        }
    }, [activeTab, selectedFrame, dataLoaded])


    if (loading) {
        return <LoadingMarketsOverview />;
    }

    if (errorMessage) {
        return <div>{errorMessage}</div>;
    }


    return (
        <div className='w-full h-auto p-4 md:p-8 flex flex-col md:flex-row justify-between bg-base rounded-lg highlight-white'>
            <div className='w-full md:w-5/12 h-auto'>
                {/* overview of all indexes (selectable) */}
                {
                    indicesData.map(({ name, data }, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                if (index > 3 && selectedFrame === '1D') setSelectedFrame('1W')
                                setSelectedIndex(index)
                            }}
                            className={`flex justify-between p-1.5 text-sm cursor-pointer hover:bg-base-lighter/50 hover:rounded-lg hover:border-base hover:text-txt-depressed ${name === indices[selectedIndex].index ? 'rounded-lg bg-base-lighter' : 'border-b border-base-lighter'}`}
                        >
                            <div className='w-1/2'>
                                <span className='font-semibold'>{name}</span>
                            </div>
                            <div className='w-1/2 flex justify-between'>
                                <span className='w-3/12 text-right'>{parse(data['05. price'])}</span>
                                <span className={`w-3/12 text-right ${data['09. change'] >= 0 ? 'text-light-green' : 'text-light-red'}`}>{data['09. change'] > 0 ? '+' : ''}{parse(data['09. change'])}</span>
                                <span className={`w-4/12 text-center rounded-lg ${data['09. change'] >= 0 ? 'text-light-green bg-light-green/10' : 'text-light-red bg-light-red/10'}`}>{parse(data['10. change percent']) > 0 ? '+' : ''}{parse(data['10. change percent'])}%</span>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='w-full md:w-6/12 h-auto flex flex-col justify-between pt-6 md:pt-0'>
                {/* header index name, value */}
                <div className='flex justify-between'>
                    <div>
                        <p className='font-bold'>{`${indices[selectedIndex].name} >`}</p>
                        <span className='text-sm text-txt-depressed'>{parse(indicesData[selectedIndex].data['05. price'])}</span>
                    </div>
                    <div className='w-4/12 md:w-auto flex flex-col md:flex-row md:space-x-4 items-start'>
                        <div className='flex items-center space-x-1'>
                            <span className='inline-block p-1 m-1 rounded-full bg-txt highlight-white'></span>
                            <span className='text-xs text-txt-depressed'>{indices[selectedIndex].index}</span>
                        </div>
                        <div className='flex items-center space-x-1'>
                            <span className='inline-block p-1 m-1 rounded-full bg-yellow-300 highlight-white'></span>
                            <span className='text-xs text-txt-depressed'>moving average</span>
                        </div>
                    </div>
                </div>
                <div className="w-full h-auto">
                    <LineChart data={loadingChart ? {} : indexData} />
                </div>
                <div className='flex justify-between text-xs border-t-2 border-base-lighter'>
                    <div className='flex space-x-2'>
                        {
                            frames.map((frame, index) => (
                                <span
                                    key={index}
                                    onClick={() => {
                                        if (!(selectedIndex > 3 && frame === '1D')) setSelectedFrame(frame)
                                    }}
                                    className={`p-1 font-semibold cursor-pointer hover:text-txt hover:transition-all ${frame === selectedFrame ? 'text-txt border-t border-accent' : 'text-txt-depressed'} ${(selectedIndex > 3 && frame === '1D') ? 'cursor-not-allowed text-txt-depressed/50 hover:text-txt-depressed/50' : ''}`}
                                >{frame}</span>
                            ))
                        }
                    </div>
                    <div className='p-1'>
                        <span className='text-txt-depressed'>{marketStatus.exchange} markets {marketStatus.isOpen ? 'open' : 'close'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarketsOverview