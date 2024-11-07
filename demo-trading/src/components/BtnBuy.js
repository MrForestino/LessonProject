import React from 'react';
   const BtnBuy =({ onBuy })=>{
		return(
			<div>
				<input type='button' value="Buy" className='BtnBuy' onClick={onBuy}/>
			</div>
		);
	 };
	export default BtnBuy;