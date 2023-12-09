import { PLAYERX, VALUES } from '../constants/constants';



/*const comprueba = (values, turn, clickReset) => {
    let por_fila = values[0][0] === values[0][1] && values[0][0] === values[0][2] && values[0][0] !== '-' ||
        values[1][0] === values[1][1] && values[1][0] === values[1][2] && values[1][0] !== '-' ||
        values[2][0] === values[2][1] && values[2][0] === values[2][2] && values[2][0] !== '-';
    let por_col = values[0][0] === values[1][0] && values[0][0] === values[2][0] && values[0][0] !== '-' ||
        values[0][1] === values[1][1] && values[0][1] === values[2][1] && values[0][1] !== '-' ||
        values[0][2] === values[1][2] && values[0][2] === values[2][2] && values[0][2] !== '-';
    let por_diag = values[0][0] === values[1][1] && values[0][0] === values[2][2] && values[0][0] !== '-' ||
        values[0][2] === values[1][1] && values[0][2] === values[2][0] && values[0][2] !== '-';

    if (por_fila || por_col || por_diag) {
        if (turn === PLAYERX) {
            alert('¡¡¡GANA X!!!')
        } else {
            alert('¡¡¡GANA O!!!')
        }
        setTimeout(() => {
            alert('NUEVO JUEGO')
            clickReset();
        }, 1000)
    }
}*/

function gameReducer(state = VALUES, action) {

    //console.log(',,,,,,,'+JSON.stringify(action))
    switch (action.type) {
        case 'PLAY_POSITION':
            let newValue = action.turn === PLAYERX ? 'X' : '0';
            let newState = JSON.parse(JSON.stringify(state));
            newState[action.x][action.y] = newValue;
            //comprueba(newState, action.turn, action.reset);
            return newState;
        case 'RESET':
            return VALUES;
        case 'DESHACER':

            if (action.historico.length > 1) {
                let newState_1 = JSON.parse(action.historico[action.historico.length - 2]);
                return newState_1;
            } else {
                return state;
            }
        default:
            return state;
    }
}
export default gameReducer;