import './App.css';
import BtnBuy from './components/BtnBuy';
import BtnSell from './components/BtnSell';
import Wallet from './components/Wallet';
import TradingWidget from './components/TradingViewWidget';
import CandleChart from './components/CandlestickChart.js';
import { useState } from 'react';

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
      alert(`Kupiłeś ${amountToTrade} BTC за ${totalCost}$`);
    } else {
      alert(`Nie masz wystarczająco kosztów!`);
    }
  };

  const handleSell = () => {
    const amountToSell = sellAll ? cryptoAmount : amountToTrade;

    if (cryptoAmount >= amountToSell) {
      const totalEarnings = amountToSell * currentPrice; 
      setBalance(balance + totalEarnings);
      setCryptoAmount(cryptoAmount - amountToSell);
      alert(`Sprzedano ${amountToSell} BTC за ${totalEarnings}$`);
    } else {
      alert('Nie masz wystarczająco waluty do sprzedaży!');
    }
  };

  return (
    <div className="App">
      <h4>Go Trade</h4>

      <div className='WalletContainer'>
        <Wallet balance={balance} />
      </div>

      <div className="TradingViewContainer">
        <TradingWidget setCurrentPrice={setCurrentPrice} />
      </div>
      <div className='TradeContainer'>
      <div className='TradeInputContainer'>
        <input
          type="number"
          min="0.5"
          value={amountToTrade}
          onChange={(e) => setAmountToTrade(Number(e.target.value))}
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
      <CandleChart/>
    </div>
  );
}

export default App;
