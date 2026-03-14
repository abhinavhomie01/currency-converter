import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
const [currencies,setCurrencies]=useState([]);
const [fromCurrency,setFromCurrency]=useState("usd");
const [toCurrency,setToCurrency]=useState("inr");
const [amount,setAmount]=useState(1);
const [converted,setConverted]=useState(0);
const [rate,setRate]=useState(null);


useEffect(()=>{
  axios.get("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json").then((res)=>{setCurrencies(res.data)});
},[]);

useEffect(()=>{
  axios
  .get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`)
  .then((res)=>{
    const newRate=res.data[fromCurrency][toCurrency];
    setRate(newRate);
    setConverted((amount*newRate).toFixed(2));
  })
},[fromCurrency,toCurrency]) 
  return (
    <div className="Container">
      <div className="row">
      <h1>Currency Converter</h1>
      <select value={fromCurrency} onChange={(e)=>{setFromCurrency(e.target.value)}}>
        {Object.entries(currencies).filter(([code,name])=>name!=="").map(([cur,name])=>(
          <option key={cur} value={cur}>{name}</option>
        ))}
        </select>
      <input type="number" value={amount} onChange={(e)=>{
        const amt=Number(e.target.value);
        setAmount(amt);
        setConverted((amt*rate).toFixed(2));
        }}/>
      <input type="number" value={converted} onChange={(e)=>{
        const val=Number(e.target.value);
        setConverted(val);
        setAmount((val/rate).toFixed(2));
      }}/>
     <select value={toCurrency} onChange={(e)=>{setToCurrency(e.target.value)}}>
        {Object.entries(currencies).filter(([code,name])=>name!=="").map(([cur,name])=>(
          <option key={cur} value={cur}>{name}</option>
        ))}
        </select>
      </div>
      <h3>1 {fromCurrency.toUpperCase()} = { rate ? rate.toFixed(2) : ""} {toCurrency.toUpperCase()}</h3>
      <button onClick={()=>{
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
      }
      }>Swap</button>
    </div>
  );
}

export default App;
