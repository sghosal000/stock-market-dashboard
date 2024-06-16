import React from 'react'
import { useData } from '../hooks/useData';

export default function TabNavigation({ tabs }) {
    const { activeTab, setActiveTab } = useData()

    return (
        <div className='fixed left-0 top-0 h-full w-12 nav-border'>
            <nav className="`w-full h-full mr-0.5 p-2 flex flex-col justify-center items-center space-y-4 bg-base1">
                {tabs.map((tab) => (
                    <a key={tab.name} onClick={() => setActiveTab(tab.name)} >
                        <img src={tab.icon} alt={tab.name} className={`invert ${activeTab === tab.name ? "stroke-accent" : "stroke-txt-depressed"}`} />
                    </a>
                ))}
            </nav>
        </div>
    );
}
