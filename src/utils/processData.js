export const processData = (data, mode) => {
    const timeSeries = data["Time Series (5min)"] || data["Time Series (Daily)"]
    const latestDate = Object.keys(timeSeries)[0].split(" ")[0];

    let filteredData;
    if (mode === '1D') {
        filteredData = Object.entries(timeSeries).filter(([datetime]) => datetime.startsWith(latestDate)).reverse();
    } else if (mode === '1W') {
        const today = new Date(latestDate)
        const oneWeekAgo = new Date(today)
        oneWeekAgo.setDate(today.getDate() - 7)

        filteredData = Object.entries(timeSeries)
            .filter(([datetime]) => {
                const date = new Date(datetime)
                return date >= oneWeekAgo && date <= today
            })
            .reverse()
    } else if (mode === '1M') {
        const today = new Date(latestDate)
        const oneMonthAgo = new Date(today)
        oneMonthAgo.setMonth(today.getMonth() - 1)

        filteredData = Object.entries(timeSeries)
            .filter(([datetime]) => {
                const date = new Date(datetime)
                return date >= oneMonthAgo && date <= today;
            })
            .reverse()
    } else if (mode === '3M') {
        const today = new Date(latestDate)
        const threeMonthsAgo = new Date(today)
        threeMonthsAgo.setMonth(today.getMonth() - 3)

        filteredData = Object.entries(timeSeries)
            .filter(([datetime]) => {
                const date = new Date(datetime)
                return date >= threeMonthsAgo && date <= today;
            })
            .reverse()
    } else if (mode === '1Y') {
        const today = new Date(latestDate)
        const oneYearAgo = new Date(today)
        oneYearAgo.setFullYear(today.getFullYear() - 1)

        filteredData = Object.entries(timeSeries)
            .filter(([datetime]) => {
                const date = new Date(datetime)
                return date >= oneYearAgo && date <= today;
            })
            .reverse()
    } else if (mode === '5Y') {
        const today = new Date(latestDate)
        const fiveYearsAgo = new Date(today)
        fiveYearsAgo.setFullYear(today.getFullYear() - 5)

        filteredData = Object.entries(timeSeries)
            .filter(([datetime]) => {
                const date = new Date(datetime)
                return date >= fiveYearsAgo && date <= today;
            })
            .reverse()
    } else if (mode === 'ALL') {
        filteredData = Object.entries(timeSeries).reverse()
    }

    const processedData = {}

    filteredData.forEach(([datetime, values], index) => {
        if (['1D', '3M', '1Y', '5Y'].includes(mode) || (mode === '1W' && index % 3 === 0) || (mode === '1M' && index % 6 === 0) || (mode === 'ALL' && index % 5 === 0)) {
            const mean = ((parseFloat(values["2. high"]) + parseFloat(values["3. low"])) / 2).toFixed(2)
            processedData[datetime] = mean
        }
    });

    // console.log(processedData);
    return processedData;
};
