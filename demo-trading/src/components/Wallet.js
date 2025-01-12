import React from 'react';

const Wallet = ({ balance, cryptoAmount }) => {
  return (
    <div className='WalletCard'>
      <h2>Balance: {balance} <span>$</span></h2>
      <h2>Crypto Amount: {cryptoAmount} <span>ETH</span></h2>
    </div>
  );
}

export default Wallet;