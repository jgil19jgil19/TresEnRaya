import React from 'react';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import { playPosition, reset } from '../redux/actions';


const squareStyle = {
  height: '5em',
  width: '5em',
  margin: '.1em'
};

function Square(props) {

  function squareClick() {
    if (!props.modoPlay) {//si está en play ya no deja mover
      if (props.faseTurno.fase === 0 || props.faseTurno.fase === 2) {
        if (props.value === "-") {
          props.boardClick(props.rowIndex, props.columnIndex);
        } else { alert('No se pueden mover las fichas ya puestas.') }
      } else {
        props.boardClick(props.rowIndex, props.columnIndex);
      }
    }
  }

  let central = props.rowIndex === 1 && props.columnIndex === 1;
  //props.setBotones(props.rowIndex,props.columnIndex,this);
  //props.botones[props.rowIndex][props.columnIndex]=this;
  //console.log(JSON.stringify(props.thisProps.faseTurno))
  //console.log('++++'+props.tuId)
  switch (props.faseTurno.fase) {
    case 0:
      return (
        <Button style={squareStyle} variant={props.value === '-' ? "info" : props.value === 'X' ? "primary" : "success"} onClick={squareClick} className={props.rowIndex === 1 && props.columnIndex === 1 ? props.finalizado ? "no_clickable" : "clickable" : "no_clickable"} ref = { props.boton } id={props.tuId}>
          {props.value}
        </Button>
      )
    case 1:
      return (
        <Button style={squareStyle} variant={props.value === '-' ? "info" : props.value === 'X' ? "primary" : "success"} onClick={squareClick} className={props.value === props.faseTurno.turno && !central ? props.finalizado ? "no_clickable" : "clickable" : "no_clickable"} ref = { props.boton } id={props.tuId}>
          {props.value}
        </Button>
      )
    case 2:
      return (
        <Button style={squareStyle} variant={props.value === '-' || (props.rowIndex === props.faseTurno.x && props.columnIndex === props.faseTurno.y) ? "info" : props.value === 'X' ? "primary" : "success"} onClick={squareClick} className={props.value === "-" ? props.finalizado ? "no_clickable" : "clickable" : "no_clickable"} ref = { props.boton } id={props.tuId}>
          {props.value}
        </Button>
      )
    default: return (
      <Button style={squareStyle} variant={props.value === '-' || (props.rowIndex === props.faseTurno.x && props.columnIndex === props.faseTurno.y) ? "info" : props.value === 'X' ? "primary" : "success"} onClick={squareClick} className={props.value === "-" ? props.finalizado ? "no_clickable" : "clickable" : "no_clickable"} ref = { props.boton } id={props.tuId}>
          {props.value}
        </Button>
    )
  }
}

const mapDispatchToProps = {
  playPosition,
  reset
}


function mapStateToProps(state) {
  //console.log('++++'+JSON.stringify(state))
  //return { ...state };
  const { finalizado, turn, values, historico, faseTurno, modoPlay } = state;
  return { finalizado, turn, values, historico, faseTurno, modoPlay }
}
export default connect(mapStateToProps, mapDispatchToProps)(Square);