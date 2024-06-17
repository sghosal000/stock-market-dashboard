import React, { useState, useEffect } from 'react'
import axios from '../../api/axios'
import useData from '../../hooks/useData'

const SectorPerformance = () => {
    const { activeTab } = useData()

    const [sectorData, setSectorData] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    let testData = {
        'Industrials': 1.66,
        'Communication Services': 1.55,
        'Technology': 1.08,
        'Consumer Cyclical': 1.02,
        'Financial': 0.99,
        'Healthcare': 0.84,
        'Real Estate': 0.69,
        'Basic Materials': 0.65,
        'Utilities': 0.57,
        'Energy': -0.05,
        'Consumer Defensive': -0.12
    }

    const calculateAverage = (data,) => {
        const total = data.reduce((sum, value) => sum + value, 0)
        return parseFloat((total / data.length).toFixed(2))
    }

    const allSectorsVal = calculateAverage(Object.values(testData))

    const fetchData = async () => {
        const randInd = Math.floor(Math.random() * 10)
        setLoading(true)

        try {
            const res = await axios.get('')
            setSectorData(res.data.feed)
            console.log(res.data);
        } catch (error) {
            console.error(error)
            setErrorMessage("Error Loading Data. Please try again later...")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setSectorData(testData)
    }, [activeTab])

    const sortedSectorData = Object.entries(sectorData).sort(([, a], [, b]) => b - a);

    return (
        <div className='w-full h-auto p-8 flex flex-col justify-between bg-base rounded-lg  highlight-white'>
            <div className='flex justify-between'>
                <span className='font-bold'>Sector performance</span>
                <span className='text-xs text-txt-depressed'>% price change</span>
            </div>
            <div className='flex space-x-10 pt-4'>
                <div className='w-1/2 h-full flex flex-col justify-around'>
                    <div className={`flex justify-between py-1 pr-4 rounded-lg text-sm border-b border-base-lighter`}>
                        <span className='border-b-2 border-accent'>All sectors</span>
                        <span>{allSectorsVal}</span>
                    </div>
                    {
                        sortedSectorData.slice(0, 5).map(([sector, value], index) => (
                            <div key={index} className={`flex justify-between py-1 pr-4 rounded-lg text-sm border-b border-base-lighter bg-gradient-to-r from-base from-80% ${value >= 0 ? 'to-light-green/20' : 'to-light-red/20'}`}>
                                <span className='text-txt-depressed'>{sector}</span>
                                <span className={value >= 0 ? 'text-light-green' : 'text-light-red'}>{value>0? '+': ''}{value}</span>
                            </div>
                        ))
                    }
                </div>
                <div className='w-1/2 h-full flex flex-col justify-around'>
                    {
                        sortedSectorData.slice(5).map(([sector, value], index) => (
                            <div key={index} className={`flex justify-between py-1 pr-4 rounded-lg text-sm border-b border-base-lighter bg-gradient-to-r from-base from-80% ${value >= 0 ? 'to-light-green/20' : 'to-light-red/20'}`}>
                                <span className='text-txt-depressed'>{sector}</span>
                                <span className={value >= 0 ? 'text-light-green' : 'text-light-red'}>{value}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SectorPerformance