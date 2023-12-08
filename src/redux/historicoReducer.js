import { VALUES , PLAYERX} from '../constants/constants';

function historicoReducer(state=[JSON.stringify(VALUES)] , action) {
    
    //console.log(state[0]+'\n'+state+'\n'+JSON.stringify(state))
    switch (action.type) {
        case 'PLAY_POSITION':
            let newValue = action.turn === PLAYERX ? 'X' : '0';
            let newTablero = JSON.parse(JSON.stringify(action.values));
            newTablero[action.x][action.y] = newValue;
            let aux=JSON.stringify(state);
            let aux1=JSON.parse(aux);
            aux1.push(JSON.stringify(newTablero));
            return aux1;
        case 'RESET':
            return [JSON.stringify(VALUES)];
        case 'DESHACER':            
            if(state.length>1){
                let new_state=(JSON.parse(JSON.stringify(state)))
                new_state.pop();
                return new_state;
            }else return state;
        default:
            return state;
    }
}
export default historicoReducer;