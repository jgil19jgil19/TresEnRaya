import React from 'react';
import Button from 'react-bootstrap/Button';

export default function Deshacer(props) {
  function click() {
    props.deshacerClick();
  }

  return(
    props.thisProps.historico.n>1&&<Button variant="warning" style={{margin: .1 + 'em'}} onClick={click} >
      Deshacer
    </Button>
  );    
}