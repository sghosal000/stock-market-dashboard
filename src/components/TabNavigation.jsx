import React from 'react'
import { useData } from '../hooks/useData';

export default function TabNavigation({ tabs }) {
    const { activeTab, setActiveTab } = useData()

    return (
        <div className='fixed left-0 top-0 h-full w-12 nav-border'>
            <nav className="`w-full h-full mr-0.5 flex flex-col justify-center items-center bg-base1">
                {tabs.map((tab) => (
                    <a key={tab.name} onClick={() => setActiveTab(tab.name)} >
                        <img src={tab.icon} alt={tab.name} className={`p-3 invert ${activeTab === tab.name ? "stroke-accent border-r border-accent" : "stroke-txt-depressed"}`} />
                    </a>
                ))}
            </nav>
        </div>
    );
}
