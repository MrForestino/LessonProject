import React, { useState } from 'react';
import BtnBuy from './components/BtnBuy';
import BtnSell from './components/BtnSell';
import Wallet from './components/Wallet';
import CandleChart from './components/CandlestickChart.js';
import './App.css';

function App() {
  const [balance, setBalance] = useState(100000);
  const [cryptoAmount, setCryptoAmount] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [amountToTrade, setAmountToTrade] = useState(1);
  const [sellAll, setSellAll] = useState(false);

  const handleBuy = () => {
    const totalCost = amountToTrade * currentPrice;

    if (totalCost <= balance) {
      setBalance(balance - totalCost);
      setCryptoAmount(cryptoAmount + amountToTrade);
      alert(`Bought ${amountToTrade} ETH for ${totalCost}$`);
    } else {
      alert(`Insufficient funds! You only have ${balance}$`);
    }
  };

  const handleSell = () => {
    const amountToSell = sellAll ? cryptoAmount : amountToTrade;

    if (cryptoAmount >= amountToSell) {
      const totalEarnings = amountToSell * currentPrice;
      setBalance(balance + totalEarnings);
      setCryptoAmount(cryptoAmount - amountToSell);
      alert(`Sold ${amountToSell} ETH for ${totalEarnings}$`);
    } else {
      alert('Not enough cryptocurrency to sell!');
    }
  };

  return (
    <div className="App">
      <h4>Go Trade</h4>

      <div className='WalletContainer'>
        <Wallet balance={balance} cryptoAmount={cryptoAmount} />
      </div>

      <div className="TradingViewContainer">
        <CandleChart setCurrentPrice={setCurrentPrice} />
      </div>

      <div className='TradeContainer'>
        <div className='TradeInputContainer'>
          <input
            type="number"
            min="0.5"
            value={amountToTrade}
            onChange={(e) => setAmountToTrade(Number(e.target.value))}
            max={balance / currentPrice}
          />
        </div>

        <div className='CheckboxContainer'>
          <label>
            <input 
              type="checkbox" 
              checked={sellAll} 
              onChange={() => setSellAll(!sellAll)}
            />
            Sell All
          </label>
        </div>
      </div>

      <div className='BtnContainer'>
        <BtnBuy onBuy={handleBuy} />
        <BtnSell onSell={handleSell} />
      </div>
    </div>
  );
}

export default App;
