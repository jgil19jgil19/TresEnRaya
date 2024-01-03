import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import turnReducer from './turnReducer';
import movesReducer from './movesReducer';
import historicoReducer from './historicoReducer';
import finalizadoReducer from './finalizadoReducer';
import faseReducer from './faseReducer';
import modoPlayReducer from './modoPlayReducer.js'



const GlobalState = combineReducers({
    turn: turnReducer,
    values: gameReducer,
    moves: movesReducer,
    historico: historicoReducer,
    finalizado: finalizadoReducer,
    faseTurno: faseReducer,
    modoPlay: modoPlayReducer
});

export default GlobalState;