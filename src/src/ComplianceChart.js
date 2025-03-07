import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ComplianceChart = ({ compliant, nonCompliant }) => {
  const data = {
    labels: ['Compliant', 'Non-Compliant'],
    datasets: [
      {
        label: 'Compliance Status',
        data: [compliant, nonCompliant],
        backgroundColor: ['#4ade80', '#f87171'],
        borderColor: ['#16a34a', '#dc2626'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Compliance Overview',
      },
    },
  };

  return (
    <div style={{width: '256px', height: '256px', margin: '0 auto'}}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ComplianceChart;
