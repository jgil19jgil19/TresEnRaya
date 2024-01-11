import './App.css';
import Header from './Header';
import Board from './Board';
import Reset from './Reset';
import Deshacer from './Deshacer';
import Rehacer from './Rehacer';
import Replay from './Replay';
import SelectorJugador from './SelectorJuagador';



import { PLAYER0, PLAYERX } from '../constants/constants';


//import { useState, useEffect} from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { playPosition, reset, deshacer, rehacer, replay, cambiaModo } from '../redux/actions';

//const PLAYERX = "Player 1 - Xs";
//const PLAYER0 = "Player 2 - 0s";
//const MYURL = "https://api.npoint.io/c734e05e43c5b87dd971";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.appClick = this.appClick.bind(this);
    this.resetClick = this.resetClick.bind(this);
    this.deshacerClick = this.deshacerClick.bind(this);
    this.rehacerClick = this.rehacerClick.bind(this);
    this.replayClick = this.replayClick.bind(this);
    this.cambiaModoChange = this.cambiaModoChange.bind(this);

    this.botones = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    for (let i = 0; i < 3; i++) {//creacion de las referencias para hacer click en los botones
      for (let j = 0; j < 3; j++) {
        this.botones[i][j] = React.createRef();
      }
    }

  }
  appClick(rowNumber, columnNumber) {
    this.props.dispatch(playPosition(rowNumber, columnNumber, this.props.turn, this.props.values, this.resetClick, this.props.historico, this.props.faseTurno, this.props.moves));
    setTimeout(() => { this.ordenadorFacil() }, 2);
  }
  resetClick() {
    this.props.dispatch(reset());
    setTimeout(() => { this.ordenadorFacil() }, 2);
  }
  deshacerClick() {
    this.props.dispatch(deshacer(this.props.historico, this.props.turn, this.props.moves, this.props.faseTurno));
  }
  rehacerClick() {
    this.props.dispatch(rehacer(this.props.historico, this.props.turn, this.props.moves, this.props.faseTurno));
  }
  replayClick(vez) {
    this.props.dispatch(replay(vez, this.props.historico, this.replayClick, this.props.modoPlay));
  }
  cambiaModoChange(jugador, modo) {
    //console.log(jugador+': '+modo);
    this.props.dispatch(cambiaModo(jugador, modo))
    setTimeout(() => { this.ordenadorFacil() }, 2);
  }

  ordenadorFacil() {//inteligencia del ordenador para determinar sus movimientos
    if (this.props.finalizado) return;
    let casX = [];
    let cas0 = [];
    let vacias = [];
    let esquinas={n:0, elegible:[0,0,0,0]}
    this.props.values.forEach((fila, i) => {
      fila.forEach((celda, j) => {
        switch (celda) {
          case 'X':
            if (i !== 1 || j !== 1) casX.push({ row: i, col: j });
            break;
          case '0': cas0.push({ row: i, col: j }); break;
          case '-': 
            vacias.push({ row: i, col: j });
            esquinas.n++
            if(i===0&&j===0){
              esquinas.elegible[0]++;
              if(this.props.values[0][1]=='-')esquinas.elegible[0]++;
              if(this.props.values[0][2]=='-')esquinas.elegible[0]++;
              if(this.props.values[1][0]=='-')esquinas.elegible[0]++;
              if(this.props.values[2][0]=='-')esquinas.elegible[0]++;
            }else if(i===0&&j===2){
              esquinas.elegible[1]++;
              if(this.props.values[0][0]=='-')esquinas.elegible[1]++;
              if(this.props.values[0][1]=='-')esquinas.elegible[1]++;
              if(this.props.values[1][2]=='-')esquinas.elegible[1]++;
              if(this.props.values[2][2]=='-')esquinas.elegible[1]++;
            }else if(i===2&&j===0){
              esquinas.elegible[2]++;
              if(this.props.values[0][0]=='-')esquinas.elegible[2]++;
              if(this.props.values[1][0]=='-')esquinas.elegible[2]++;
              if(this.props.values[2][1]=='-')esquinas.elegible[2]++;
              if(this.props.values[2][2]=='-')esquinas.elegible[2]++;
            }else if(i===2&&j===2){
              esquinas.elegible[3]++;
              if(this.props.values[0][2]=='-')esquinas.elegible[3]++;
              if(this.props.values[1][2]=='-')esquinas.elegible[3]++;
              if(this.props.values[2][1]=='-')esquinas.elegible[3]++;
              if(this.props.values[2][0]=='-')esquinas.elegible[3]++;
            }
          break;
          default: ;
        }
      })
    });
    //alert(JSON.stringify(casX))
    let elem;
    let casilla
    if (this.props.turn === PLAYERX && this.props.jugadores.PLAYERX === 'ordenador') {
      //alert('ahora procederiamos en conseucuencia')

      if (this.props.faseTurno.fase === 0) {
        elem = this.botones[1][1].current;
      } else {
        let casEl;
        let casGan;
        let casEl0;
        let casGan0;

        if (casX.length > 0) {
          for (let i = 0; i < casX.length; i++) {
            let c = casX[i];
            if (this.props.values[2 - c.row][2 - c.col] === '-') {
              if (casX.length > 1) casEl = casX[1 - i];
              casGan = { row: 2 - c.row, col: 2 - c.col }
              break;
            }
          }
        }
        //alert(JSON.stringify(casGan))
        if(casGan === undefined){//alert('se entra')
          if (cas0.length === 2) {
            //alert(cas0[0].row+'-'+cas0[1].row+'|'+this.props.values[cas0[0].row][3-cas0[0].col-cas0[1].col])
            if (cas0[0].row === cas0[1].row && this.props.values[cas0[0].row][3 - cas0[0].col - cas0[1].col] === '-') {
              casGan0 = { row: cas0[0].row, col: 3 - cas0[0].col - cas0[1].col };
              //if (cas0.length === 3) casEl0 = cas0[2];
            } else if (cas0[0].col === cas0[1].col && this.props.values[3 - cas0[0].row - cas0[1].row][cas0[0].col] === '-') {
              casGan0 = { col: cas0[0].col, row: 3 - cas0[0].row - cas0[1].row };
              //if (cas0.length === 3) casEl0 = cas0[2];
            }
          } else if (cas0.length === 3) {
            //alert('sii');
            if (cas0[0].row === cas0[1].row&&cas0[0].row!==1) {
              if(this.props.values[cas0[0].row][3 - cas0[0].col - cas0[1].col] === '-') casGan0 = { row: cas0[0].row, col: 3 - cas0[0].col - cas0[1].col };
              else casEl0 = { row: cas0[0].row, col: 3 - cas0[0].col - cas0[1].col };
            } 
            if (cas0[0].col === cas0[1].col&&cas0[0].col!==1) {
              if(this.props.values[3 - cas0[0].row - cas0[1].row][cas0[0].col] === '-')casGan0 = { col: cas0[0].col, row: 3 - cas0[0].row - cas0[1].row };
              else casEl0 = { col: cas0[0].col, row: 3 - cas0[0].row - cas0[1].row };
            } 
            if (cas0[0].row === cas0[2].row&&cas0[0].row!==1) {
              if(this.props.values[cas0[0].row][3 - cas0[0].col - cas0[2].col] === '-')casGan0 = { row: cas0[0].row, col: 3 - cas0[0].col - cas0[2].col };
              else casEl0 = { row: cas0[0].row, col: 3 - cas0[0].col - cas0[2].col };
            } 
            if (cas0[0].col === cas0[2].col&&cas0[0].col!==1) {
              if(this.props.values[3 - cas0[0].row - cas0[2].row][cas0[0].col] === '-')casGan0 = { col: cas0[0].col, row: 3 - cas0[0].row - cas0[2].row };
              else casEl0 = { col: cas0[0].col, row: 3 - cas0[0].row - cas0[2].row };
            } 
            if (cas0[1].row === cas0[2].row&&cas0[1].row!==1) {
              if(this.props.values[cas0[1].row][3 - cas0[1].col - cas0[2].col] === '-')casGan0 = { row: cas0[1].row, col: 3 - cas0[1].col - cas0[2].col };
              else casEl0 = { row: cas0[1].row, col: 3 - cas0[1].col - cas0[2].col };
            } 
            if (cas0[1].col === cas0[2].col&&cas0[1].col!==1) {
              if(this.props.values[3 - cas0[1].row - cas0[2].row][cas0[1].col] === '-')casGan0 = { col: cas0[1].col, row: 3 - cas0[1].row - cas0[2].row };
              else casEl0 = { col: cas0[1].col, row: 3 - cas0[1].row - cas0[2].row };
            }
          }
        }

        if (this.props.faseTurno.fase === 1) {
          if (casEl !== undefined) casilla = casEl;
          else if(casEl0 !== undefined){//alert(JSON.stringify(casEl0)+'\n'+JSON.stringify(casX))
            for(let i=0;i<casX.length;i++){
              if(casX[i].row===casEl0.row&&casX[i].col===casEl0.col){
                casilla=casX[1-i];
                break;
              }
            }
          }else {
            for (let i=0;i<casX.length;i++){
              if(Math.abs(casX[i].row-casX[i].col)%2===0){
                casEl0=casX[1-i];
              }
            }
            if(casEl0 !== undefined) casilla = casEl0;
            else casilla = casX[Math.floor(2 * Math.random())]
          }
          elem = this.botones[casilla.row][casilla.col].current;
        } else {
          if (casGan !== undefined) casilla = casGan
          else if(casGan0 !== undefined) casilla = casGan0
          else {
            if(esquinas.n===3){
              for(let i=0;i<4;i++){
                if(esquinas.elegible[i]===3){
                  switch (i){
                    case 0: casGan0={row:0,col:0};break;
                    case 1: casGan0={row:0,col:2};break;
                    case 2: casGan0={row:2,col:0};break;
                    default: casGan0={row:2,col:2};
                  }
                  break;
                }
              }
            }
            if(casGan0 !== undefined) casilla = casGan0
            else casilla = vacias[Math.floor(vacias.length * Math.random())]
          }
          elem = this.botones[casilla.row][casilla.col].current
        }
      }
    }
    if (this.props.turn === PLAYER0 && this.props.jugadores.PLAYER0 === 'ordenador') {
      let casEl;
      let casGan;
      let casEl0;
      let casGan0;
      

      if (cas0.length === 2) {
        //alert(cas0[0].row+'-'+cas0[1].row+'|'+this.props.values[cas0[0].row][3-cas0[0].col-cas0[1].col])
        if (cas0[0].row === cas0[1].row && this.props.values[cas0[0].row][3 - cas0[0].col - cas0[1].col] === '-') {
          casGan0 = { row: cas0[0].row, col: 3 - cas0[0].col - cas0[1].col };
          //if (cas0.length === 3) casEl0 = cas0[2];
        } else if (cas0[0].col === cas0[1].col && this.props.values[3 - cas0[0].row - cas0[1].row][cas0[0].col] === '-') {
          casGan0 = { col: cas0[0].col, row: 3 - cas0[0].row - cas0[1].row };
          //if (cas0.length === 3) casEl0 = cas0[2];
        }
      } else if (cas0.length === 3) {
        //alert('sii');
        if (cas0[0].row === cas0[1].row && this.props.values[cas0[0].row][3 - cas0[0].col - cas0[1].col] === '-') {
          casGan0 = { row: cas0[0].row, col: 3 - cas0[0].col - cas0[1].col };
          casEl0 = cas0[2];
        } else if (cas0[0].col === cas0[1].col && this.props.values[3 - cas0[0].row - cas0[1].row][cas0[0].col] === '-') {
          casGan0 = { col: cas0[0].col, row: 3 - cas0[0].row - cas0[1].row };
          casEl0 = cas0[2];
        } else if (cas0[0].row === cas0[2].row && this.props.values[cas0[0].row][3 - cas0[0].col - cas0[2].col] === '-') {
          casGan0 = { row: cas0[0].row, col: 3 - cas0[0].col - cas0[2].col };
          casEl0 = cas0[1];
        } else if (cas0[0].col === cas0[2].col && this.props.values[3 - cas0[0].row - cas0[2].row][cas0[0].col] === '-') {
          casGan0 = { col: cas0[0].col, row: 3 - cas0[0].row - cas0[2].row };
          casEl0 = cas0[1];
        } if (cas0[1].row === cas0[2].row && this.props.values[cas0[1].row][3 - cas0[1].col - cas0[2].col] === '-') {
          casGan0 = { row: cas0[1].row, col: 3 - cas0[1].col - cas0[2].col };
          casEl0 = cas0[0];
        } else if (cas0[1].col === cas0[2].col && this.props.values[3 - cas0[1].row - cas0[2].row][cas0[1].col] === '-') {
          casGan0 = { col: cas0[1].col, row: 3 - cas0[1].row - cas0[2].row };
          casEl0 = cas0[0];
        }
      }

      if(casGan0 === undefined) {
        if (casX.length > 0) {
          let sum=0;
          let indices=[];
          for (let i = 0; i < casX.length; i++) {
            let c = casX[i];
            if (this.props.faseTurno.fase === 1&&this.props.values[2 - c.row][2 - c.col] === '0') {//alert('['+([2 - c.row])+','+([2 - c.col])+']'+JSON.stringify(cas0))
              for (let j = 0; j < cas0.length; j++) {
                if (cas0[j].row === 2 - c.row && cas0[j].col === 2 - c.col) {
                  //casEl = cas0[j];alert(JSON.stringify(casEl))
                  indices.push(j);
                  sum+=j;
                  break;
                }

              }
            }
            if (this.props.faseTurno.fase === 2&&this.props.values[2 - c.row][2 - c.col] === '-') {
              //if(casX.length>1)casEl=casX[1-i];
              casGan = { row: 2 - c.row, col: 2 - c.col }
              break;
            }
          }
          if (this.props.faseTurno.fase === 1){
            if(indices.length===2){
              casEl = cas0[3-sum];
            }else{
              casEl = cas0[0];
              if(sum===0)casEl = cas0[1]
            }
            //alert(sum+JSON.stringify(indices)+'\n'+JSON.stringify(cas0)+JSON.stringify(casEl))
          }
        }
      }




      if (this.props.faseTurno.fase === 1) {
        if (casGan0 !== undefined) {
          if (casEl0 !== undefined) casilla = casEl0;
        } else {
          if (casEl !== undefined) casilla = casEl;
          else casilla = cas0[Math.floor(3 * Math.random())]
        }
        //alert('+++'+JSON.stringify(casilla))
        elem = this.botones[casilla.row][casilla.col].current
      } else if (this.props.faseTurno.fase === 2) {

        if (casGan0 !== undefined) casilla = casGan0
        else if (casGan !== undefined) casilla = casGan;
        else casilla = vacias[Math.floor(vacias.length * Math.random())]
        elem = this.botones[casilla.row][casilla.col].current
      }
    }
    elem.click();
    //console.log(JSON.stringify(esquinas))
    //if(this.props.jugadores===)
  }

  render() {
    //alert(this.props.finalizado);
    //const [botones,setBotones]=useState([[0,0,0],[0,0,0],[0,0,0]]);
    let text = "Turn of " + this.props.turn;
    return (
      <div>
        <Header text={text} />
        <Board values={this.props.values} appClick={this.appClick} botones={this.botones} />
        <h3>Number of moves: {this.props.moves}</h3>
        <Reset resetClick={this.resetClick} modoPlay={this.props.modoPlay} />
        <Deshacer deshacerClick={this.deshacerClick} thisProps={this.props} />
        <Rehacer rehacerClick={this.rehacerClick} thisProps={this.props} />
        {!this.props.finalizado && <header className="info">{this.props.faseTurno.fase === 0 ? 'Se debe poner en el centro.' : this.props.faseTurno.fase === 2 ? 'Elige la casilla para poner la ficha' : 'Elige la ficha a desplazar'} </header>}
        {this.props.finalizado && <Header text={this.props.turn === PLAYERX ? '¡GANA 000!' : '¡GANA XXX!'} />}
        <Replay replayClick={this.replayClick} thisProps={this.props} />
        <SelectorJugador ficha="PLAYERX" cambiaModoChange={this.cambiaModoChange} />
        <SelectorJugador ficha="PLAYER0" cambiaModoChange={this.cambiaModoChange} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { ...state };
}
export default connect(mapStateToProps)(App);

