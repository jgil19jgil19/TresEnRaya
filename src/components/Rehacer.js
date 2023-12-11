import React from 'react';
import Button from 'react-bootstrap/Button';

export default function Rehacer(props) {
  function click() {
    console.log('se entra en Rehacer')
    props.rehacerClick();
  }

  return(
    props.thisProps.historico.n<props.thisProps.historico.values.length&&<Button variant="warning" style={{margin: .1 + 'em'}} onClick={click} >
      Rehacer
    </Button>
  );    
}