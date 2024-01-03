import React from 'react';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';


function Replay(props) {
  function click() {
    if(!props.modoPlay) props.replayClick(0);
  }

  return(
    props.historico.n>1&&<Button variant="warning" style={{margin: .1 + 'em'}} onClick={click} >
      <img src="./play.png" style={{width:2+'em'}}></img>
    </Button>
  );    
}

function mapStateToProps(state) {
  //console.log('++++'+JSON.stringify(state))
  //return { ...state };
  const {historico, modoPlay}=state;
  return {historico, modoPlay}
}
export default connect(mapStateToProps)(Replay);