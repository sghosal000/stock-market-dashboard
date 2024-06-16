import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import useData from '../../hooks/useData';

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
        <div className='w-full h-full p-8 flex flex-col justify-between bg-base rounded-lg highlight-white'>
            <div className='flex space-x-4'>
                <div className='flex items-center p-1 px-4 rounded-full bg-base-lighter highlight-white'>
                    <p className='w-auto'>The markets are <span className='text-light-green'>bullish</span></p>
                </div>
                <div className='flex items-center p-1 px-2 rounded-full bg-base-lighter highlight-white'>
                    <img src="https://www.svgrepo.com/show/533642/arrow-up-right.svg" alt="up" className='h-4 invert' />
                </div>
            </div>
            <div>
                <p className='text-xs text-txt-depressed'>What you need to know today</p>
                <p className='text-lg font-bold'>'Someone played this beautifully': Why one expert is suspicious of the latest meme-stock revival</p>
            </div>
        </div>
    );
};

export default MarketSummary;
