import React from 'react'

const LoadingMarketSummary = () => {
    return (
        <div className='w-full h-60 md:h-full p-4 md:p-8 rounded-lg highlight-white bg-gradient-to-br from-light-green/10 to-40% to-base'>
            <div className='w-full h-full flex-col flex justify-between animate-pulse'>
                <div className='flex space-x-2'>
                    <div className='h-6 w-4/12 flex items-center p-0.5 px-4 rounded-full bg-base-lighter highlight-white'></div>
                    <div className='h-6 w-6 flex items-center p-0.5 rounded-full bg-base-lighter highlight-white'></div>
                </div>
                <div className='flex flex-col space-y-2'>
                    <div className='h-3 w-4/12 bg-base-lighter rounded-full'></div>
                    <div className='h-4 w-11/12 bg-base-lighter rounded-full'></div>
                    <div className='h-4 w-full bg-base-lighter rounded-full'></div>
                </div>
            </div>
        </div>
    )
}

export default LoadingMarketSummary