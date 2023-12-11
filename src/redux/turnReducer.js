import { PLAYERX, PLAYER0 } from '../constants/constants';
function turnReducer(state = PLAYERX, action) {
    //console.log('action: '+action.turn);
    //console.log('PLAYERX: '+PLAYERX);
    //console.log('PLAYER0: '+PLAYER0);

    switch (action.type) {
        case 'PLAY_POSITION':
            return action.turn === PLAYERX ? PLAYER0 : PLAYERX;
        case 'RESET':
            return PLAYERX;
        case 'DESHACER':
            if (action.historico.n)
                return action.turn === PLAYERX ? PLAYER0 : PLAYERX;
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