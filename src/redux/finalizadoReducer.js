import { PLAYERX, VALUES } from '../constants/constants';


const comprueba = (values) => {
    let por_fila = (values[0][0] === values[0][1] && values[0][0] === values[0][2] && values[0][0] !== '-') ||
        (values[1][0] === values[1][1] && values[1][0] === values[1][2] && values[1][0] !== '-') ||
        (values[2][0] === values[2][1] && values[2][0] === values[2][2] && values[2][0] !== '-');
    let por_col = (values[0][0] === values[1][0] && values[0][0] === values[2][0] && values[0][0] !== '-') ||
        (values[0][1] === values[1][1] && values[0][1] === values[2][1] && values[0][1] !== '-') ||
        (values[0][2] === values[1][2] && values[0][2] === values[2][2] && values[0][2] !== '-');
    let por_diag = (values[0][0] === values[1][1] && values[0][0] === values[2][2] && values[0][0] !== '-') ||
        (values[0][2] === values[1][1] && values[0][2] === values[2][0] && values[0][2] !== '-');

    //alert(JSON.stringify(values)+'kkk'+(por_fila || por_col || por_diag));
    return (por_fila || por_col || por_diag)
}

function finalizadoReducer(state = false, action) {

    //console.log(',,,,,,,'+JSON.stringify(action))
    switch (action.type) {
        case 'PLAY_POSITION':
            let newValue = action.turn === PLAYERX ? 'X' : '0';
            let tablero = JSON.parse(JSON.stringify(action.values));
            tablero[action.x][action.y] = newValue;
            return comprueba(tablero);
        case 'RESET':
            return false;
        case 'DESHACER':
            return false;
        case 'REHACER':
            //console.log(action.historico.values.length+ 'vs'+ action.historico.n)
            if (action.historico.values.length > action.historico.n) {
                //let newValue_R = action.turn === PLAYERX ? 'X' : '0';
                //console.log(JSON.stringify(action.historico.values[action.historico.n]))
                let tablero_R = JSON.parse(action.historico.values[action.historico.n]);
                return comprueba(tablero_R);
            }else return state;
        default:
            return state;
    }
}
export default finalizadoReducer;