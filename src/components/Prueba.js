import React from 'react';
import Button from 'react-bootstrap/Button';

export default function Prueba(props) {
  function click() {
    //let elem=document.getElementById('Sq1-1');
    let elemi=document.getElementById('kk');
    //let elem=this.refs.Sq1_1;
    let elem=props.botones[1][1].current;
    alert(elem.id+'elemento'+elem);
    elem.click();
    elemi.click();
    //console.log(JSON.stringify(elem))
    //let event = new Event("click");
    //let event = new MouseEvent("click");
    //elem.dispatchEvent(event);
    //props.resetClick();
  }

  return(
    <Button variant="warning" style={{margin: .1 + 'em'}} onClick={click} >
      Prueba
    </Button>
  );    
}