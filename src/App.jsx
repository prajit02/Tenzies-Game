import { useState, useEffect } from 'react'
import './index.css'
import Die from './Die'
import ShortUniqueId from 'short-unique-id';
import Confetti from 'react-confetti'
// import { use } from 'react';
// import { Connect } from 'vite';

function App() {
  const uid = new ShortUniqueId();
  
  function randomNumber(){
    return Math.ceil(Math.random() * 6);
  }

  const [dice, setDice] = useState(generateArray());
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [minTime, setMinTime] = useState(0);

  const gameWon = dice.every(die => die.isPressed) && dice.every(die => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      clearInterval(intervalId);
      setIntervalId(null);
      setMinTime((oldMinTime) => Math.min(oldMinTime===0 ? time : oldMinTime, time));
      setTime(0);
    }
  }, [gameWon]);

  function setter(){
    const id = setInterval(()=>{setTime((oldTime) => oldTime+10)}, 10);
    setIntervalId(id);
  }

  function generateArray(){
    return Array.from({length: 10}, () => ({
      id: uid.rnd(),
      isPressed: false,
      value: randomNumber()
    }));
  }

  // console.log(dice);
  function hold(id) {
    setDice(oldDice => oldDice.map(die =>
        die.id === id ?
            { ...die, isHeld: !die.isHeld } :
            die
    ))
  }

  function diceClicked(id){
    setDice(oldDice => oldDice.map(
      die => die.id === id ? 
        {...die, isPressed: !die.isPressed} : die
    ));
    // console.log(id);
    // console.log(dice);
  }

  const diceComponents = dice.map(diceObj => (
    <Die 
      key = {diceObj.id}
      value = {diceObj.value}
      clicked = {diceObj.isPressed}
      clickfn = {() => diceClicked(diceObj.id)}
    />
  ));

  function rollDice(){
    if(!gameWon) {
      setDice(oldDice => oldDice.map(
        die => !die.isPressed ? {...die, value: randomNumber()} : die
      ));
      if(intervalId===null) setter();
    }
    else {
      setDice(generateArray());
    }
  }

  return (
    <>
      {gameWon && <Confetti />}
      <div id = "mainApp">
        <h1 className = "title">Tenzies</h1>
        <p className = "instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className = "diceContainer">
              {diceComponents}
        </div>
        <button onClick = {rollDice} id = "rollDice">{gameWon ? "New Game" : "Roll"}</button>
        <p>Least Recorded time: {minTime/1000} seconds <br/> Current time: {time/1000} seconds</p>
      </div>
    </>
  )
}

export default App;