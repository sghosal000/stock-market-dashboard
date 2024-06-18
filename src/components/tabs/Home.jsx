import React from 'react'
import Header from '../Header'
import MarketSummary from '../home/MarketSummary'
import SectorPerformance from '../home/SectorPerformance'
import MarketsOverview from '../home/MarketsOverview'


const Home = () => {

    return (
        <div className='w-11/12 md:w-10/12 mx-auto text-txt'>
            <Header />
            <div className='w-full py-10 flex flex-col space-y-6'>
                <div className='flex flex-col md:flex-row justify-between'>
                    <div className='w-full md:w-5/12 raise'>
                        <MarketSummary />
                    </div>
                    <div className='w-full md:w-6/12 pt-6 md:pt-0 raise'>
                        <SectorPerformance />
                    </div>
                </div>
                <div>
                    <p className='py-4 text-txt-depressed font-bold'>Markets</p>
                    <div className='raise'>
                        <MarketsOverview />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home