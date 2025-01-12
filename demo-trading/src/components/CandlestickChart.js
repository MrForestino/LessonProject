import React, { useRef, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const StyledTradingChart = ({ setCurrentPrice }) => {
  const chartRef = useRef(null);
  const [series, setSeries] = useState([{ data: [] }]);
  const [interval, setInterval] = useState('1m');
  const [limit, setLimit] = useState(100);

  const options = {
    chart: {
      id: 'candlestick',
      type: 'candlestick',
      background: '#131722',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
        type: 'x',
        zoomedArea: {
          background: '#90CAF9',
        },
      },
    },
    title: {
      text: 'Ethereum / Tether (ETH/USDT)',
      align: 'left',
      style: {
        color: '#FFFFFF',
        fontSize: '14px',
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: '#A0A0A0',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#A0A0A0',
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#26a69a',
          downward: '#ef5350',
        },
      },
    },
    grid: {
      borderColor: '#3C4043',
      strokeDashArray: 4,
    },
    theme: {
      mode: 'dark',
    },
  };

  const fetchCandlestickData = async () => {
    try {
      const response = await axios.get('https://api.binance.com/api/v3/klines', {
        params: {
          symbol: 'ETHUSDT',
          interval,
          limit,
        },
      });

      const formattedData = response.data.map((candle) => ({
        x: new Date(candle[0]),
        y: [
          parseFloat(candle[1]),
          parseFloat(candle[2]),
          parseFloat(candle[3]),
          parseFloat(candle[4]),
        ],
      }));

      setSeries([{ data: formattedData }]);

      const currentPrice = parseFloat(response.data[response.data.length - 1][4]);
      setCurrentPrice(currentPrice);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    fetchCandlestickData();
  }, [interval, limit]); // Викликає оновлення даних при зміні інтервалу чи кількості свічок.

  const changeCandleSize = (newInterval, newLimit) => {
    setInterval(newInterval);
    setLimit(newLimit);
  };

  return (
    <div
      style={{
        width: '100%',
        background: '#131722',
        borderRadius: '8px',
        padding: '10px',
      }}
    >
      <div style={{ width: '100%', height: '400px' }}>
        <Chart
          ref={chartRef}
          options={options}
          series={series}
          type="candlestick"
          width="100%"
          height="100%"
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px',
        }}
      >
        <button
          style={buttonStyle}
          onClick={() => changeCandleSize('1m', 600)}
        >
          1M
        </button>
        <button
          style={buttonStyle}
          onClick={() => changeCandleSize('5m', 500)}
        >
          5M
        </button>
        <button
          style={buttonStyle}
          onClick={() => changeCandleSize('15m', 400)}
        >
          15M
        </button>
        <button
          style={buttonStyle}
          onClick={() => changeCandleSize('1h', 300)}
        >
          1H
        </button>
        <button
          style={buttonStyle}
          onClick={() => changeCandleSize('1d', 100)}
        >
          1D
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  background: '#1E2228',
  color: '#FFFFFF',
  border: 'none',
  borderRadius: '4px',
  padding: '8px 12px',
  margin: '0 5px',
  cursor: 'pointer',
  fontSize: '14px',
  textAlign: 'center',
};

export default StyledTradingChart;
