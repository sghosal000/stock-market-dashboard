import React from 'react';
import { Compass, SearchIcon, Logo } from '../assets/icons';

const Header = () => {
    const getCurrentDate = () => {
        const date = new Date();
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const date = getCurrentDate();

    return (
        <div className='relative w-full h-auto sm:h-24 flex flex-col sm:flex-row justify-between sm:justify-between items-center p-4 border-b-2 border-base'>
            {/* logo on the top for small screen */}
            <div className='absolute top-4 left-4 sm:hidden'>
                <Logo />
            </div>
            <div className='w-full sm:w-auto flex flex-col items-end sm:items-start'>
                <h1 className='text-xl font-bold text-txt'>Hello, Jane</h1>
                <h3 className='text-sm text-txt-depressed'>{date}</h3>
            </div>
            <div className='w-full sm:w-auto flex space-x-4 justify-between mt-4 sm:mt-0'>
                <div className='w-auto h-auto p-2 px-4 rounded-full bg-base-lighter highlight-white hover:text-txt-depressed transition-all'>
                    <a href="#" className='flex items-center space-x-2'>
                        <Compass className="h-4 stroke-2 stroke-txt" />
                        <p className='text-xs'>For you</p>
                    </a>
                </div>
                <div className='w-auto h-auto p-2 px-4 rounded-full bg-base-lighter highlight-white hover:text-txt-depressed transition-all'>
                    <a href="#" className='flex items-center space-x-2'>
                        <img src="https://www.svgrepo.com/show/358000/meeting-board.svg" alt="screen" className='h-4 invert' />
                        <p className='text-xs'>Screener</p>
                    </a>
                </div>
                <div className='w-auto h-auto p-2 rounded-full bg-base-lighter highlight-white'>
                    <a href="#" className='flex items-center space-x-2'>
                        <SearchIcon className='h-4 stroke-2 stroke-txt hover:stroke-txt-depressed' />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Header;
