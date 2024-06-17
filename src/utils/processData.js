export const processIntradayData = (data, mode) => {
    const timeSeries = data["Time Series (5min)"];
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
        oneMonthAgo.setDate(today.getMonth() - 1)

        filteredData = Object.entries(timeSeries)
            .filter(([datetime]) => {
                const date = new Date(datetime)
                return date >= oneMonthAgo && date <= today;
            })
            .reverse()
    }

    const processedData = {}

    filteredData.forEach(([datetime, values], index) => {
        if (mode === '1D' || (mode === '1W' && index % 3 === 0) || (mode === '1M' && index % 6 === 0)) {
            const mean = ((parseFloat(values["2. high"]) + parseFloat(values["3. low"])) / 2).toFixed(2)
            processedData[datetime] = mean
        }
    });

    // console.log(processedData);
    return processedData;
};
