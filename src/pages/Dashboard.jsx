import React from 'react';
import TabNavigation from '../components/TabNavigation';
import Home from '../components/tabs/Home';
import Search from '../components/tabs/Search';
import Profile from '../components/tabs/Profile';
import Bookmarks from '../components/tabs/Bookmarks';
import Settings from '../components/tabs/Settings';

import useData from '../hooks/useData';


const Dashboard = () => {
    const { activeTab } = useData()

    const tabs = [
        { name: 'Home', link: '#', icon: 'https://www.svgrepo.com/show/505393/home-1.svg' },
        { name: 'Search', link: '#', icon: 'https://www.svgrepo.com/show/532552/search-alt-2.svg' },
        { name: 'Profile', link: '#', icon: 'https://www.svgrepo.com/show/532906/book-open.svg' },
        { name: 'Bookmarks', link: '#', icon: 'https://www.svgrepo.com/show/474018/bookmark.svg' },
        { name: 'Settings', link: '#', icon: 'https://www.svgrepo.com/show/511123/settings-future.svg' },
    ]

    const render = (activeTab) => {
        switch (activeTab) {
            case tabs[0].name:
                return <Home />;
            case tabs[1].name:
                return <Search />;
            case tabs[2].name:
                return <Profile />;
            case tabs[3].name:
                return <Bookmarks />;
            case tabs[4].name:
                return <Settings/>;
            default:
                return null;
        }
    }

    return (
        <div className="background text-txt">
            <TabNavigation tabs={tabs} />
            <div className='pl-14'>
                {render(activeTab)}
            </div>
        </div>
    )
}

export default Dashboard;
