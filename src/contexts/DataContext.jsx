import React, { createContext, useState } from 'react'

const DataContext = createContext(null)

export const DataProvider = (props) => {
	const [activeTab, setActiveTab] = useState('Home')
	const [trigger, setTrigger] = useState(false)

	const refresh = () => {
		setTrigger(!trigger)
	}

	return (
		<DataContext.Provider value={{
			activeTab,
			setActiveTab,
			trigger,
			refresh,
		}}>
			{props.children}
		</DataContext.Provider>
	)
}

export default DataContext
