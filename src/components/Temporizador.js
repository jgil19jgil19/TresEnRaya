import React from 'react';
import Form from 'react-bootstrap/Form';

export default function Temporizador(props) {
  const formatea=(t)=>{
    let cent=t%100;
    let seg=(t-cent)/100;
    let seg1=seg%60;
    let min=(seg-seg1)/60;
    let aux=cent+'';
    if (aux.length<2)cent='0'+aux
    aux=seg1+'';
    if (aux.length<2)seg1='0'+aux
    return min+':'+seg1+','+cent;
  }

  return(
    <div>
    <span style={{fontWeight: 'bold'}}>TIEMPO MÁXIMO POR JUGADOR:</span>
    <Form.Select aria-label="Default select example" style={{width: '12em', backgroundColor: 'yellow'}} onChange={(e) => { props.ponLimiteClick(e.target.value)}}>
      <option value="0">Sin limite</option>
      <option value="1500">15 segundos</option>
      <option value="3000">30 segundos</option>
      <option value="6000">1 minuto</option>
      <option value="12000">2 minutos</option>
    </Form.Select>
    <h2>PLAYERX: <span style={{color:'#0d6efd', fontWeight: 'bold'}}>{formatea(props.tx)}</span></h2>
    <h2>PLAYER0: <span style={{color:'#198754', fontWeight: 'bold'}}>{formatea(props.t0)}</span></h2>
    </div>
  );    
}
//'PLAYERX'?'#0d6efd':'#198754'