import { VALUES, PLAYERX } from '../constants/constants';

function historicoReducer(state = { values: [JSON.stringify(VALUES)], n: 1 }, action) {

    //console.log(state[0]+'\n'+state+'\n'+JSON.stringify(state))
    switch (action.type) {
        case 'PLAY_POSITION':
            let newValue = action.turn === PLAYERX ? 'X' : '0';
            let newTablero = JSON.parse(JSON.stringify(action.values));
            newTablero[action.x][action.y] = newValue;
            let aux = JSON.stringify(state);
            let aux1 = JSON.parse(aux);
            let nitems = aux1.values.length;
            aux1.values.splice(aux1.n, nitems - aux1.n, JSON.stringify(newTablero));
            //aux1.push(JSON.stringify(newTablero));
            return { values: aux1.values, n: aux1.n + 1 };
        case 'RESET':
            return { values: [JSON.stringify(VALUES)], n: 1 };
        case 'DESHACER':
            if (state.n > 1) {
                let new_state = (JSON.parse(JSON.stringify(state)))
                new_state.n = new_state.n - 1;
                //new_state.pop();
                return new_state;
            } else return state;
        case 'REHACER':
            if (state.n < state.values.length) {
                let new_state = (JSON.parse(JSON.stringify(state)))
                new_state.n = state.n + 1;
                //new_state.pop();
                return new_state;
            } else return state;
        default:
            return state;
    }
}
export default historicoReducer;