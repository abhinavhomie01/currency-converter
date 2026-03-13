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
  axios.get("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json").then((res)=>{setCurrencies(Object.keys(res.data))});
},[]);

useEffect(()=>{
  axios
  .get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${fromCurrency}.json`)
  .then((res)=>{
    setRate(res.data[fromCurrency][toCurrency]);
    setConverted((amount*rate).toFixed(2));
  })
},[fromCurrency,toCurrency,amount])
  return (
    <div className="Container">
      <div className="row">
      <h1>Currency Converter</h1>
      <select value={fromCurrency} onChange={(e)=>{setFromCurrency(e.target.value)}}>
        {currencies.map((cur)=>{
          <option key={cur} value={cur}>{cur.toUpperCase}</option>
        })}
        </select>
      <input type="number" value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
      <input type="number" value={converted} onChange={(e)=>{
        setConverted(e.target.value);
        setAmount(e.target.value/rate);
      }}/>
     <select value={toCurrency} onChange={(e)=>{setToCurrency(e.target.value)}}>
        {currencies.map((cur)=>{
          <option key={cur} value={cur}>{cur.toUpperCase}</option>
        })}
        </select>
      </div>
      <h3>1 {fromCurrency.toUpperCase} = {rate} {toCurrency.toUpperCase}</h3>
      <button onClick={()=>{
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
      }
      }>Swap</button>
    </div>
  );
}

export default App;
