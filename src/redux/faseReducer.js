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

function faseReducer(state = {fase:0,x:-1,y:-1,turno:'X'}, action) {
    //faseTurno:{fase:1,x:1,y:1,turno:'X'}
    //console.log(',,,,,,,'+JSON.stringify(action))
    switch (action.type) {
        case 'PLAY_POSITION':
            if (action.moves<5){
                if(action.moves===0) return {fase:2,x:-1,y:-1,turno:'0'}
                else{
                    let newValue = action.turn === PLAYERX ? '0' : 'X';
                    let nuevoEstado={fase:2, x:-1, y:-1,turno:newValue}
                    return nuevoEstado
                }                
            }else{
                if(state.fase===1){
                    
                    let nuevoEstado={fase:2, x:action.x, y:action.y,turno:state.turno}
                    return nuevoEstado
                }else{//fase 2:
                    let newValue = action.turn === PLAYERX ? '0' : 'X';
                    return {fase:1, x:action.x, y:action.y,turno:newValue}
                }
            }           
        case 'RESET':
            return {fase:0, x:-1, y:-1,turno:'X'};
        case 'DESHACER':
            let newValue = action.turn === PLAYERX ? '0' : 'X';
            if(action.moves===1) return {fase:0, x:1, y:1,turno:'X'};
            else if (action.moves<7) return {fase:2, x:-1, y:-1, turno:newValue};
            else {//moves 6 y siguentes
                if(state.fase===1) return {fase:1, x:-1, y:-1, turno:newValue};
                else return {fase:1, x:1, y:1, turno:state.turno}
            }
        case 'REHACER':
            let newValue2 = action.turn === PLAYERX ? '0' : 'X';
            if(action.moves===-1) return {fase:0, x:1, y:1,turno:'X'};
            else if (action.moves<5) return {fase:2, x:-1, y:-1, turno:newValue2};
            else return {fase:1, x:1, y:1, turno:newValue2};
        default:
            return state;
    }
}
export default faseReducer;