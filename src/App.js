import './App.css';
import Header from './Header';
import Board from './Board';
import Reset from './Reset';
import { useState, useEffect } from 'react';

const PLAYERX = "Player 1 - Xs";
const PLAYER0 = "Player 2 - 0s";
const MYURL = "https://api.npoint.io/c734e05e43c5b87dd971";


function App() {
  const [turn, setTurn] = useState(PLAYERX);
  const [moves, setMoves] = useState(0);
  const [values, setValues] = useState([
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
    ]);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `Turn of ${turn}`;
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(MYURL);
      const myjson = await res.json();
      console.log(myjson);
      setTurn(myjson.turn);
      setMoves(myjson.moves);
      setValues(myjson.values);
    }

    fetchData();
  }, []);

  function appClick(rowNumber, columnNumber){
    console.log("CLICK en: ", rowNumber, columnNumber);
    let valuesCopy = JSON.parse(JSON.stringify(values));
    let newMovement = turn === PLAYERX ? 'X' : '0';
    valuesCopy[rowNumber][columnNumber] = newMovement;
    setTurn(turn === PLAYERX ? PLAYER0 : PLAYERX);
    setValues(valuesCopy);
    setMoves(moves=>moves+1);
  }

  function resetClick(){
    setTurn(PLAYERX);
    setMoves(0);
    setValues([
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-']
      ]);
  }

  let text = "Turn of " + turn;
  return (
    <div className='App'>
      <h2>Tic Tac Toe</h2>
      <Header text={text}/>
      <Board values={values} appClick={appClick}/>
      <h3>Número de movimientos: {moves}</h3>
      <Reset resetClick={resetClick}></Reset>
    </div>
  );
}

export default App;
