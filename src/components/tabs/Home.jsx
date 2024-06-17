import React from 'react'
import Header from '../Header'
import MarketSummary from '../home/MarketSummary'
import SectorPerformance from '../home/SectorPerformance'
import MarketsOverview from '../home/MarketsOverview'


const Home = () => {

    return (
        <div className='w-10/12 mx-auto text-txt'>
            <Header />
            <div className='w-full py-10 flex flex-col space-y-10'>
                <div className='flex flex-col md:flex-row justify-between'>
                    <div className='w-5/12'>
                        <MarketSummary />
                    </div>
                    <div className='w-6/12'>
                        <SectorPerformance />
                    </div>
                </div>
                <div>
                    <p className='py-4 text-txt-depressed font-bold'>Markets</p>
                    <MarketsOverview />
                </div>
            </div>
        </div>
    )
}

export default Home