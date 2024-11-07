import React, { useEffect, useRef, memo } from 'react';
import axios from 'axios';

function TradingViewWidget({setCurrentPrice}) {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "width": "100%",
          "height": "100%",
          "symbol": "BINANCE:BTCUSDT",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "backgroundColor": "rgba(23, 23, 23, 1)",
          "gridColor": "rgba(66, 66, 66, 1)",
          "hide_top_toolbar": true ,
          "hide_side_toolbar": false,
          "allow_symbol_change": false,
          "save_image": true,
          "calendar": false,
          "hide_volume": true,
          "support_host": "https://www.tradingview.com"
        }`;
      			container.current.appendChild(script);


            const fetchCurrentPrice = async () => {
              try {
                const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
                const price = response.data.bitcoin.usd;
                setCurrentPrice(price);
              } catch (error){
                console.error("Wystąpił błąd podczas pobierania aktualnej ceny: ", error);
              }
            };
            fetchCurrentPrice();
            const intervalId = setInterval(fetchCurrentPrice, 1000);

				return () => {
        clearInterval(intervalId);
				 if (container.current){
					 container.current.innerHTML = '';
				 }
				}
		 },
		 []
	 );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(TradingViewWidget);
