import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import useData from '../../hooks/useData';
import { RightUpArrow } from '../../assets/icons';

const MarketSummary = () => {
    const { activeTab } = useData();

    const [news, setNews] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchData = async () => {
        const randInd = Math.floor(Math.random() * 10);
        setLoading(true);

        try {
            const res = await axios.get('function=NEWS_SENTIMENT&topics=financial_markets&sort=RELEVANCE');
            setNews(res.data.feed);
            console.log(res.data);
        } catch (error) {
            console.error(error);
            setErrorMessage("Error Loading Data. Please try again later...");
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     fetchData();
    // }, [activeTab]);

    return (
        <div className='w-full h-full p-8 flex flex-col justify-between rounded-lg highlight-white bg-gradient-to-br from-light-green/10 to-40% to-base'>
            <div className='flex space-x-2'>
                <div className='flex items-center p-0.5 px-4 rounded-full bg-base-lighter highlight-white'>
                    <p className='w-auto'>The markets are <span className='text-light-green'>bullish</span></p>
                </div>
                <div className='flex items-center p-0.5 rounded-full bg-base-lighter highlight-white'>
                    <RightUpArrow className="w-5 stroke-light-green stroke-2" />
                </div>
            </div>
            <div>
                <p className='text-xs text-txt-depressed'>What you need to know today</p>
                <a
                    href="https://markets.businessinsider.com/news/stocks/meme-stock-explosion-suspicious-option-trading-activity-gamestop-amc-gme-2024-5"
                    className='text-lg font-bold'
                >
                    'Someone played this beautifully': Why one expert is suspicious of the latest meme-stock revival
                </a>
            </div>
        </div>
    );
};

export default MarketSummary;
