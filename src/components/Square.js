import React from 'react';
import Button from 'react-bootstrap/Button';

const squareStyle = {
  height: '5em',
  width: '5em',
  margin: '.1em'
};

export default function Square(props) {


  function squareClick() {
    if (props.thisProps.faseTurno.fase === 0 || props.thisProps.faseTurno.fase === 2) {
      if (props.value === "-") {
        props.boardClick(props.rowIndex, props.columnIndex);
      } else { alert('No se pueden mover las fichas ya puestas.') }
    } else {
      props.boardClick(props.rowIndex, props.columnIndex);
    }

  }
  let central=props.rowIndex===1&&props.columnIndex===1;
  //console.log(JSON.stringify(props.thisProps.faseTurno))
  switch (props.thisProps.faseTurno.fase) {
    case 0:
      return (
        <Button style={squareStyle} variant={props.value === '-' ? "info" : props.value === 'X' ? "primary" : "success"} onClick={squareClick} className={props.rowIndex === 1 && props.columnIndex === 1 ? props.thisProps.finalizado ? "no_clickable" : "clickable" : "no_clickable"}>
          {props.value}
        </Button>
      )
    case 1:
      return (
        <Button style={squareStyle} variant={props.value === '-' ? "info" : props.value === 'X' ? "primary" : "success"} onClick={squareClick} className={props.value === props.thisProps.faseTurno.turno &&!central? props.thisProps.finalizado ? "no_clickable" : "clickable" : "no_clickable"}>
          {props.value}
        </Button>
      )
    case 2:
      return (
        <Button style={squareStyle} variant={props.value === '-'||(props.rowIndex===props.thisProps.faseTurno.x&&props.columnIndex===props.thisProps.faseTurno.y) ? "info" : props.value === 'X' ? "primary" : "success"} onClick={squareClick} className={props.value === "-" ? props.thisProps.finalizado ? "no_clickable" : "clickable" : "no_clickable"}>
          {props.value}
        </Button>
      )
  }
  /*return (
    (props.thisProps.faseTurno.fase===0)?
      <Button style={squareStyle} variant={props.value==='-'?"info":props.value==='X'?"primary":"success"} onClick={squareClick} className={props.rowIndex===1&&props.columnIndex===1 ?props.thisProps.finalizado?"no_clickable" : "clickable" : "no_clickable"}>
        {props.value}
     </Button>
    :
    props.thisProps.faseTurno.fase===1)?
       <Button style={squareStyle} variant={props.value==='-'?"info":props.value==='X'?"primary":"success"} onClick={squareClick} className={props.value === props.thisProps.faseTurno.turno ?props.thisProps.finalizado?"no_clickable" : "clickable" : "no_clickable"}>
        {props.value}
       </Button>   
      :<Button style={squareStyle} variant={props.value==='-'?"info":props.value==='X'?"primary":"success"} onClick={squareClick} className={props.value === "-" ?props.thisProps.finalizado?"no_clickable" : "clickable" : "no_clickable"}>
        {props.value}
      </Button>
  );*/

}