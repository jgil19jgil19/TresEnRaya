import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import turnReducer from './turnReducer';
import movesReducer from './movesReducer';
import historicoReducer from './historicoReducer';
import finalizadoReducer from './finalizadoReducer';
import faseReducer from './faseReducer';



const GlobalState = combineReducers({
    turn: turnReducer,
    values: gameReducer,
    moves: movesReducer,
    historico: historicoReducer,
    finalizado: finalizadoReducer,
    faseTurno: faseReducer
});

export default GlobalState;