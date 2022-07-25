import React, { useState, useEffect, useRef } from"react";
import './App.css';

const App = () => {
  const [quotes, setQuotes] = useState("");
  const textRef = useRef();
  let colors = ["#FFFF00", "#0000FF", "#ff0000", "#00FF00", "#800080"];

  const getQuote = () => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        let randomNum = Math.floor(Math.random() * data.length);
        setQuotes(data[randomNum]);
      });
  };


  useEffect(() => {
    getQuote();
  }, []);

  useEffect(() => {
    textRef.current.style.color = colors[Math.floor(Math.random()*colors.length)];
  }, [quotes]);

  return (
    <div className="App">
      <div className="quote">
        <p ref={textRef}>{quotes.text}</p>
        <p>Author: {quotes.author}</p>
        <div className="btnContainer">
          <button onClick={{getQuote}} className="btn">
            New Quote
          </button>
          <a 
          href={`https://twitter.com/intent/tweet?text=${quotes.text}`} 
          target=" blank"
          rel="noopener noreferrer"
          className="btn">
            Tweet
            </a>
        </div>
      </div>
    </div>
  );
};

export default App;
