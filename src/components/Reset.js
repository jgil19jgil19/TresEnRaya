import React from 'react';
import Button from 'react-bootstrap/Button';

export default function Reset(props) {
  function click() {
    props.resetClick();
  }

  return(
    <Button variant="warning" style={{margin: .1 + 'em'}} onClick={click} >
      Reset
    </Button>
  );    
}