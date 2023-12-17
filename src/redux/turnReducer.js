import { PLAYERX, PLAYER0 } from '../constants/constants';
function turnReducer(state = PLAYERX, action) {
    //console.log('action: '+action.turn);
    //console.log('PLAYERX: '+PLAYERX);
    //console.log('PLAYER0: '+PLAYER0);

    switch (action.type) {
        case 'PLAY_POSITION':
            if(action.faseTurno.fase===1) return state;
            else return action.turn === PLAYERX ? PLAYER0 : PLAYERX;
        case 'RESET':
            return PLAYERX;
        case 'DESHACER':
            if (action.historico.n)
                if(action.moves<6||action.faseTurno.fase===1)
                    return action.turn === PLAYERX ? PLAYER0 : PLAYERX;
                else return state;
            else return state;
        case 'REHACER':
            if (action.historico.n<action.historico.values.length )
                return action.turn === PLAYERX ? PLAYER0 : PLAYERX;
            else return state;
        default:
            return state;
    }
}
export default turnReducer;