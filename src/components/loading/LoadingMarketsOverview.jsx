import React from 'react'

const LoadingMarketsOverview = () => {
    return (
        <div className='w-full h-auto p-4 md:p-8 bg-base rounded-lg highlight-white'>
            <div className='w-full h-full flex flex-col md:flex-row justify-between animate-pulse'>
                <div className='w-full md:w-5/12 h-auto'>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8].map((data, index) => (
                            <div key={index} className={`flex justify-between p-1.5 text-sm cursor-pointer ${index === 0 ? 'rounded-lg bg-base-lighter' : 'border-b border-base-lighter'}`}>
                                <div className='w-1/2'>
                                    <div className='h-3 w-5/12 py-2 loading'></div>
                                </div>
                                <div className='w-1/2 flex justify-between'>
                                    <div className='h-3 w-3/12 py-2 loading'></div>
                                    <div className='h-3 w-3/12 py-2 loading'></div>
                                    <div className='h-3 w-3/12 py-2 loading'></div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='w-full md:w-6/12 h-auto flex flex-col justify-between pt-6 md:pt-0'>
                    <div className='flex justify-between'>
                        <div className='w-8/12 space-y-2'>
                            <div className='h-4 w-10/12 py-2 loading'></div>
                            <div className='h-2 w-3/12 py-2 loading'></div>
                        </div>
                        <div className='w-4/12 flex flex-col md:flex-row md:space-x-4 items-start'>
                            <div className='h-4 w-6/12 flex items-center space-x-1'>
                                <div className='h-4 w-2/12 loading'></div>
                                <div className='h-4 w-8/12 loading'></div>
                            </div>
                            <div className='h-4 w-6/12 flex items-center space-x-1'>
                                <div className='h-4 w-2/12 loading'></div>
                                <div className='h-4 w-8/12 loading'></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-auto"></div>
                    <div className='flex justify-between text-xs border-t-2 border-base-lighter'>
                        <div className='pt-2 flex space-x-2'>
                            {
                                [1, 2, 3, 4, 5, 6,].map((frame, index) => (
                                    <div key={index} className='h-5 w-8 rounded-full bg-base-lighter'></div>
                                ))
                            }
                        </div>
                        <div className='pt-2'>
                            <div className='h-4 w-20 loading'></div>
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
        </div>
    )
}

export default LoadingMarketsOverview