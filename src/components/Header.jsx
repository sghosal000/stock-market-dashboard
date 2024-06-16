import React from 'react';

const Header = () => {
    const getCurrentDate = () => {
        const date = new Date();
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const date = getCurrentDate();

    return (
        <div className='w-full h-24 p-4 border-b-2 border-base flex justify-between items-center'>
            <div>
                <h1 className='text-xl font-bold text-txt'>Hello, Jane</h1>
                <h3 className='text-sm text-txt-depressed'>{date}</h3>
            </div>
            <div className='flex space-x-4'>
                <div className='w-auto h-auto p-2 px-4 rounded-full bg-base-lighter highlight-white'>
                    <a href="#" className='flex items-center space-x-2'>
                        <img src="https://www.svgrepo.com/show/502593/compass.svg" alt="explore" className='h-4 invert' />
                        <p className='text-xs'>For you</p>
                    </a>
                </div>
                <div className='w-auto h-auto p-2 px-4 rounded-full bg-base-lighter highlight-white'>
                    <a href="#" className='flex items-center space-x-2'>
                        <img src="https://www.svgrepo.com/show/521515/board-chart.svg" alt="screen" className='h-4 invert' />
                        <p className='text-xs'>Screener</p>
                    </a>
                </div>
                <div className='w-auto h-auto p-2 rounded-full bg-base-lighter highlight-white'>
                    <a href="#" className='flex items-center space-x-2'>
                        <img src="https://www.svgrepo.com/show/532552/search-alt-2.svg" alt="search" className='h-4 invert' />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Header;
