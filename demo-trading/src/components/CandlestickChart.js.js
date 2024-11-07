// MyCandlestickChart.js
import React from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const CandleChart = () => {
  const options = {
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: 'Candlestick Chart',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };

  const series = [
    {
      data: [
        {
          x: new Date('2024-11-20').getTime(),
          y: [135, 140, 130, 138]
        },
        {
          x: new Date('2024-11-21').getTime(),
          y: [137, 145, 135, 142]
        },
        {
          x: new Date('2024-11-22').getTime(),
          y: [141, 150, 140, 148]
        },
        {
          x: new Date('2024-11-23').getTime(),
          y: [147, 155, 145, 150]
        },
        {
          x: new Date('2024-11-24').getTime(),
          y: [149, 160, 148, 155]
        },
        {
          x: new Date('2024-11-25').getTime(),
          y: [160, 165, 130, 135]
        }
      ]
    }
  ];

  return (
    <div>
      <Chart options={options} series={series} type="candlestick" height={350} />
    </div>
  );
};

export default CandleChart;
