import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import turnReducer from './turnReducer';
import movesReducer from './movesReducer';
import historicoReducer from './historicoReducer';

const GlobalState = combineReducers({
    turn: turnReducer,
    values: gameReducer,
    moves: movesReducer,
    historico: historicoReducer
});

export default GlobalState;