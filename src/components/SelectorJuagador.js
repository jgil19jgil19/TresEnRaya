import Form from 'react-bootstrap/Form';


function SelectorJugador(props) {
  let color=(props.ficha==='PLAYERX'?'#0d6efd':'#198754');
  const modoChange=(m)=>{
    props.cambiaModoChange(props.ficha,m);
  }
  
  return (
    <h1 style={{width: '9em',  fontSize: 'calc(11px + 2vmin)', backgroundColor: color}}>{props.ficha}: 
    <Form.Select aria-label="Default select example" style={{backgroundColor: color}} onChange={(e) => { modoChange(e.target.value)}}>
      <option value="humano">humano</option>
      <option value="ordenador">ordenador</option>
    </Form.Select></h1>
  );
}

export default SelectorJugador;