import React from 'react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LineChart({ data }) {
	const options = {
		maintainAspectRatio: false,
		plugins: {
			legend: { display: false },
			tooltip: {
				mode: 'nearest',
				intersect: false,
			},
		},
		scales: {
			x: { display: false },
			y: { display: false },
		},
		interaction: {
			mode: 'nearest',
			axis: 'x',
			intersect: false,
		},
	};

	const lineChartData = {
		labels: Object.keys(data),
		datasets: [
			{
				label: "Value",
				data: Object.values(data),
				borderColor: "rgb(75, 192, 192)",
				borderWidth: 1,
				radius: 0,
			},
		],
	};

	return <Line options={options} data={lineChartData} />;
}
