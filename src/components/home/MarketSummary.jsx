import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useData from '../../hooks/useData';
import { truncateParagraph } from '../../utils/truncateParagraph';
import { RightUpArrow } from '../../assets/icons';

import LoadingMarketSummary from '../loading/LoadingMarketSummary';

const MarketSummary = () => {
    const apikey = import.meta.env.VITE_API_KEY
    const { activeTab } = useData();

    const [news, setNews] = useState('');
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const testNews = {
        title: "'Someone played this beautifully': Why one expert is suspicious of the latest meme-stock revival",
        url: "https://markets.businessinsider.com/news/stocks/meme-stock-explosion-suspicious-option-trading-activity-gamestop-amc-gme-2024-5",
        time_published: "20240515T172500",
        authors: [
            "Matthew Fox"
        ],
        summary: "Market Expert Suspicious of the Latest Meme-Stock Revival in GameStop - Markets Insider ...",
        banner_image: null,
        source: "Business Insider",
        category_within_source: "GoogleRSS",
        source_domain: "markets.businessinsider.com",
        topics: [
            {
                "topic": "Retail & Wholesale",
                "relevance_score": "0.5"
            },
            {
                "topic": "Finance",
                "relevance_score": "0.5"
            },
            {
                "topic": "Financial Markets",
                "relevance_score": "0.999999"
            }
        ],
        overall_sentiment_score: 0.114149,
        overall_sentiment_label: "Neutral"
    }

    const fetchData = async () => {
        setLoading(true);
        const randInd = Math.floor(Math.random() * 10);

        try {
            const res = await axios.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=financial_markets&sort=RELEVANCE&apikey=${apikey}`);
            // switching to test data when api fetch limit reached
            if (!res.data.feed) return setNews(testNews)
            setNews(res.data.feed[randInd]);
        } catch (error) {
            console.error(error);
            setErrorMessage("Error Loading Data. Please try again later...");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [activeTab]);


    if (loading) {
        return <LoadingMarketSummary />;
    }

    if (errorMessage) {
        return <div>{errorMessage}</div>;
    }

    let color = 'txt'
    switch (news.overall_sentiment_label) {
        case "Bullish":
            color = 'light-green'
            break;
        case "Somewhat-Bullish":
            color = 'light-green'
            break;
        case "Neutral":
            color = 'txt-depressed'
            break;
        case "Bearish":
            color = 'light-red'
            break;
        case "Somewhat-Bearish":
            color = 'light-red'
            break;
        default:
            color = 'txt'
            break;
    }

    return (
        <div className='w-full h-60 md:h-full p-4 md:p-8 flex flex-col justify-between rounded-lg highlight-white bg-gradient-to-br from-light-green/10 to-40% to-base'>
            <div className='flex space-x-2'>
                <div className='flex items-center p-0.5 px-4 rounded-full bg-base-lighter highlight-white'>
                    <p className='w-auto'>The markets are <span className={`text-${color}`}>{news.overall_sentiment_label}</span></p>
                </div>
                <div className='flex items-center p-0.5 rounded-full bg-base-lighter highlight-white'>
                    <RightUpArrow className={`w-5 stroke-txt-depressed stroke-2`} />
                </div>
            </div>
            <div>
                <p className='text-xs text-txt-depressed'>What you need to know today</p>
                <a href={news.url} className='text-lg font-bold'>{truncateParagraph(news.title, 20)}</a>
            </div>
        </div>
    );
};

export default MarketSummary;
