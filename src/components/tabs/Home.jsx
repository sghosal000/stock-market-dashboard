import React from 'react'
import Header from '../Header'
import MarketSummary from '../home/MarketSummary'
import SectorPerformance from '../home/SectorPerformance'


const Home = () => {

    return (
        <div className='w-11/12 mx-auto text-txt'>
            <Header />
            <div className='w-full pt-10 flex flex-col justify-around'>
                <div className='flex flex-col md:flex-row justify-around'>
                    <div className='w-5/12'>
                        <MarketSummary />
                    </div>
                    <div className='w-6/12'>
                        <SectorPerformance />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home