import React from 'react'
import { useData } from '../hooks/useData';
import { Logo } from '../assets/icons';

export default function TabNavigation({ tabs }) {
    const { activeTab, setActiveTab } = useData()

    return (
        <div className='fixed bottom-0 left-0 md:top-0 h-12 w-full md:h-full md:w-12 nav-border'>
            <div className='hidden md:flex justify-center pt-6'>
                <Logo />
            </div>
            {/* md:mr-0.5 not working.. check later */}
            <nav className="w-full md:w-[2.9rem] h-full mt-0.5 md:mr-0.5 flex md:flex-col justify-around md:justify-center items-center bg-base1">
                {tabs.map((tab) => (
                    <a key={tab.name} onClick={() => setActiveTab(tab.name)} >
                        <tab.icon className={`h-12 md:h-auto md:w-full p-3 cursor-pointer stroke hover:stroke-2 hover:stroke-txt transition duration-300 ${activeTab === tab.name ? "stroke-accent border-t md:border-t-0 md:border-r border-accent" : "stroke-txt-depressed"}`} />
                    </a>
                ))}
            </nav>
        </div>
    );
}
