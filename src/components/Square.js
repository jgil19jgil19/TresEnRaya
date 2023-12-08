import React from 'react';
import Button from 'react-bootstrap/Button';

const squareStyle = {
  height: '5em',
  width: '5em',
  margin: '.1em'
};

export default function Square(props) {

  function squareClick() {
    if (props.value === "-") {
      props.boardClick(props.rowIndex, props.columnIndex);
    } else { alert('No se pueden mover las fichas ya puestas.')}
  }

  return (
    <Button style={squareStyle} variant={props.value==='-'?"info":props.value==='X'?"primary":"success"} onClick={squareClick} className={props.value === "-" ? "clickable" : "no_clickable"}>
      {props.value}
    </Button>
  );

}