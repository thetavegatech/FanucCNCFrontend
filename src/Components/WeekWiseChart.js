// Import necessary libraries
import React from 'react';
import ApexCharts from 'react-apexcharts';

const PartCountStackedChart = () => {
  // Define the data for the chart
  const data = [721, 743, 716, 743, 712, 701];
  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const target = 800;

  // Calculate the completed and rejected values
  const completed = data.map(count => Math.min(count, target));
  const rejected = data.map(count => Math.max(0, target - count));

  // Chart options
  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      }
    },
    xaxis: {
      categories: labels
    },
    yaxis: {
      title: {
        text: 'Part Count'
      }
    },
    title: {
      text: 'Part Count - Completed vs Rejected [ Last 6 Days ]',
      align: 'left'
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    }
  };

  // Series data
  const series = [
    {
      name: 'Completed',
      data: completed
    },
    {
      name: 'Rejected',
      data: rejected
    }
  ];

  return (
    // <div className="chart-container">
      <ApexCharts options={options} series={series} type="bar" height={350} />
    // </div>
  );
};

export default PartCountStackedChart;
