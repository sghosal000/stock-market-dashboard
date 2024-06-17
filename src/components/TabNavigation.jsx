import React from 'react'
import { useData } from '../hooks/useData';
import { Logo } from '../assets/icons';

export default function TabNavigation({ tabs }) {
    const { activeTab, setActiveTab } = useData()

    return (
        <div className='fixed left-0 top-0 h-full w-12 nav-border'>
            <div className='flex justify-center pt-6'>
                <Logo />
            </div>
            <nav className="`w-full h-full mr-0.5 flex flex-col justify-center items-center bg-base1">
                {tabs.map((tab) => (
                    <a key={tab.name} onClick={() => setActiveTab(tab.name)} >
                        <tab.icon className={`w-full p-3 stroke ${activeTab === tab.name ? "stroke-accent border-r border-accent" : "stroke-txt-depressed"}`} />
                    </a>
                ))}
            </nav>
        </div>
    );
}
