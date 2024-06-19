import React from 'react'

const LoadingSectorPerformance = () => {
    return (
        <div className='w-full h-auto p-4 md:p-8 flex flex-col justify-between bg-base rounded-lg  highlight-white'>
            <div className='w-full h-full flex flex-col justify-between animate-pulse'>
                <div className='flex justify-between'>
                    <div className='h-4 w-3/12 loading'></div>
                    <div className='h-2 w-2/12 loading'></div>
                </div>
                <div className='flex space-x-10 pt-4'>
                    <div className='w-1/2 h-auto flex flex-col justify-around'>
                        <div className={`flex justify-between py-1 pr-4 rounded-lg text-sm border-b border-base-lighter`}>
                            <div className='h-3 w-6/12 py-2 loading'></div>
                            <div className='h-3 w-2/12 py-2 loading'></div>
                        </div>
                        {
                            [0, 1, 2, 3, 4, 5].map((value, index) => (
                                <div key={index} className={`flex justify-between py-1 pr-4 rounded-lg text-sm border-b border-base-lighter`}>
                                    <div className='h-3 w-5/12 py-2 loading'></div>
                                    <div className='h-3 w-2/12 py-2 loading'></div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='w-1/2 h-auto flex flex-col justify-around'>
                        {
                            [0, 1, 2, 3, 4, 5, 6].map((value, index) => (
                                <div key={index} className={`flex justify-between py-1 pr-4 rounded-lg text-sm border-b border-base-lighter`}>
                                    <div className='h-3 w-5/12 py-2 loading'></div>
                                    <div className='h-3 w-2/12 py-2 loading'></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingSectorPerformance