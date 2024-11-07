import React from 'react';

const Wallet = ({balance}) => {
	return(
		<div className='WalletCard'>
			<h2>{balance} <span>$</span></h2>
		</div>
	);
}
export default Wallet;