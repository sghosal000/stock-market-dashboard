import React, { useState, useEffect } from 'react'
import axios from '../../api/axios';
import useData from '../../hooks/useData';

import { processIntradayData } from '../../utils/processData';
import { testIndicesData, testSPYIntraday, testSPYDaily } from '../charts/data';

import LineChart from '../charts/LineChart';

const MarketsOverview = () => {
    const apikey = import.meta.env.VITE_API_KEY

    const indices = [
        {
            index: 'S&P 500',
            name: 'SPDR S&P 500 ETF Trust',
            symbol: 'SPY'
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

    const frames = ['1D', '1W', '1M', '3M', '1Y', 'ALL']

    const { activeTab } = useData()

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedFrame, setSelectedFrame] = useState('1D')

    const [indicesData, setIndicesData] = useState([])
    const [indexData, setIndexData] = useState([])

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const parse = (data) => parseFloat(data).toFixed(2)

    const fetchIndicesData = async () => {
        setLoading(true)

        try {
            // api fetch limit will exceed for multiple request
            // const fetchPromises = indices.map(async ([indexName, symbol]) => {
            //     const res = await axios.get(`/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikey}`);
            //     return { name: indexName, data: res.data['Global Quote'] }
            // })

            // const results = await Promise.all(fetchPromises)
            // setIndicesData(results);
            // console.log(results);


            setIndicesData(testIndicesData)
        } catch (error) {
            console.error(error);
            setErrorMessage("Error Loading Data. Please try again later...");
        } finally {
            setLoading(false);
        }
    }

    const fetchIndexData = async () => {
        setLoading(true);

        try {
            // api fetch limit will exceed for multiple request
            // const res = await axios.get(``);
            // setIndexData(res.data);

            if (['1D', '1W', '1M'].includes(selectedFrame)) {
                setIndexData(processIntradayData(testSPYIntraday, selectedFrame));
            } else {
                setIndexData(testSPYDaily);
            }

        } catch (error) {
            console.error(error);
            setErrorMessage("Error Loading Data. Please try again later...");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIndicesData();
    }, [activeTab]);

    useEffect(() => {
        fetchIndexData();
    }, [activeTab, selectedIndex, selectedFrame]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (indicesData.length === 0) {
        return <div>No data available</div>;
    }
    // console.log(indexData);

    return (
        <div className='w-full h-auto p-8 flex justify-between bg-base rounded-lg highlight-white'>
            <div className='w-5/12 h-auto'>
                {/* overview of all indexes (selectable) */}
                {
                    indicesData.map(({ name, data }, index) => (
                        <div key={index} onClick={() => setSelectedIndex(index)} className={`flex justify-between p-1.5 text-sm cursor-pointer ${name === indices[selectedIndex].index ? 'rounded-lg bg-base-lighter' : 'border-b border-base-lighter'}`}>
                            <div className='w-1/2'>
                                <span className='font-semibold'>{name}</span>
                            </div>
                            <div className='w-1/2 flex justify-between'>
                                <span className='w-1/3 text-center'>{parse(data['05. price'])}</span>
                                <span className={`w-1/3 text-center ${data['09. change'] >= 0 ? 'text-light-green' : 'text-light-red'}`}>{parse(data['09. change'])}</span>
                                <span className={`w-1/3 text-center rounded-lg ${data['09. change'] >= 0 ? 'text-light-green bg-light-green/10' : 'text-light-red bg-light-red/10'}`}>{parse(data['10. change percent'])}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='w-6/12 h-auto flex flex-col justify-between'>
                {/* header index name, value */}
                <div className='flex justify-between'>
                    <div>
                        <p className='font-bold'>{`${indices[selectedIndex].name} >`}</p>
                        <span className='text-sm text-txt-depressed'>{parse(indicesData[selectedIndex].data['05. price'])}</span>
                    </div>
                    <div className='flex space-x-4 items-start'>
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
                    <LineChart data={indexData} />
                </div>
                <div className='flex justify-between pt-2 text-xs border-t-2 border-base-lighter'>
                    <div className='flex space-x-2'>
                        {
                            frames.map((frame, index) => (
                                <span key={index} onClick={() => setSelectedFrame(frame)} className={`p-1 cursor-pointer ${frame === selectedFrame ? 'text-txt font-bold' : 'text-txt-depressed font-semibold'}`}>{frame}</span>
                            ))
                        }
                    </div>
                    <div>
                        <span className='p=1 text-txt-depressed'>US markets open</span>
                    </div>
                </div>
                {/* <div className='flex space-x-2'>
                    {
                        frames.map((frame, index) => (
                            <span key={index} onClick={() => setSelectedFrame(frame)} className={`p-1 px-3 text-xs bg-base-lighter rounded-full highlight-white cursor-pointer ${frame === selectedFrame? 'text-txt': 'text-txt-depressed'}`}>{frame}</span>
                        ))
                    }
                </div> */}
            </div>
        </div>
    )
}

export default MarketsOverview