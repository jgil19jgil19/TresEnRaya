import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';




function Replay(props) {
  const [muestraInfo, setMuestraInfo] = useState(true);
  const switchInfo = () => {
    setMuestraInfo(!muestraInfo);
  }
  function click() {
    if (!props.modoPlay) props.replayClick(0);
  }

  return (
    <div>
      <Button variant={muestraInfo ? "info" : "warning"} style={{ margin: .1 + 'em' }} onClick={switchInfo} >Info</Button>
      {props.historico.n > 1 && <Button variant="warning" style={{ margin: .1 + 'em' }} onClick={click} >
        <img src="./play.png" style={{ width: 2 + 'em' }} alt="boton play"></img>
      </Button>}
      {!muestraInfo && <p style={{fontWeight: 'bold'}}>Enlace al proyecto: <a href="https://github.com/jgil19jgil19/TresEnRaya" target="_blank">https://github.com/jgil19jgil19/TresEnRaya</a></p>}
    </div>
  );
}

function mapStateToProps(state) {
  const { historico, modoPlay } = state;
  return { historico, modoPlay }
}
export default connect(mapStateToProps)(Replay);