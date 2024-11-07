import React from 'react';
   const BtnSell =({onSell})=>{
		return(
			<div>
				<input type='button' value="Sell" className='BtnSell' onClick={onSell}/>
			</div>
		);
	 };
	export default BtnSell;