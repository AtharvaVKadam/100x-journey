import React, { useState, useEffect, useMemo, useCallback } from "react";

function Day10() {
  const [exchangeReturns, setExchangeReturns] = useState(1000);
  const [dummyState, setDummyState] = useState(0);

  const incomeTax = useMemo(() => {
    console.log("💰 Calculating Income Tax... (Expensive Operation)");
    return exchangeReturns * 0.3;
  }, [exchangeReturns]);

  useEffect(() => {
    console.log("STOCK EXCHANGE UPDATED: New Returns are", exchangeReturns);
  }, [exchangeReturns]);

  const handleRefresh = useCallback(() => {
    setExchangeReturns(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Crypto Dashboard 💰</h1>
      
      <h3>Returns: ${exchangeReturns}</h3>
      <h3>Income Tax (30%): ${incomeTax}</h3>

      <CryptoButton onClick={handleRefresh} />
      
      <br /><br />
      <hr />

      <button onClick={() => setDummyState(dummyState + 1)}>
        Force Re-render (Test)
      </button>
      <p>Re-render Count: {dummyState}</p>
    </div>
  );
}

const CryptoButton = React.memo(function({ onClick }) {
  console.log(" CryptoButton Re-rendered!");
  return <button onClick={onClick} style={{ padding: "10px 20px" }}>Refresh Markets 🔄</button>;
});

export default Day10;