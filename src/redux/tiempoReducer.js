import { PLAYERX, PLAYER0 } from '../constants/constants';

function tiempoReducer(state = {PLAYERX:0, PLAYER0:0, activo:PLAYERX, limite:0}, action) {
    switch (action.type) {
        case 'PLAY_POSITION':
            //alert('kkk'+action.type)
            let newState = JSON.parse(JSON.stringify(state));            
            newState.activo = action.turn === PLAYERX ? PLAYER0:PLAYERX;
            switch (action.faseTurno.fase){
                case 0:
                    return newState;
                case 1:
                    return state;
                case 2:
                    return newState;
                default: return state;//nunca se debe llegar
            }
        case 'RESET':
            return {PLAYERX:0, PLAYER0:0, activo:PLAYERX, limite:state.limite}
        case 'TIC':
            let nuevo = JSON.parse(JSON.stringify(state));
            nuevo.activo===PLAYERX?nuevo.PLAYERX++:nuevo.PLAYER0++;
            return nuevo;
        case 'PONLIMITE':
            let nestado=JSON.parse(JSON.stringify(state));
            nestado.limite=action.limite;
            return nestado;
        default:
            return state;
    }
}
export default tiempoReducer;