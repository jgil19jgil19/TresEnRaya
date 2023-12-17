function movesReducer(state = 0, action) {
    switch (action.type) {
        case 'PLAY_POSITION':
            if(action.faseTurno.fase===2||action.faseTurno.fase===0)
                return state + 1
            else return state;
        case 'RESET':
            return 0;
        case 'DESHACER':
            if (state > 0){
                if(state<6||action.faseTurno.fase===1)
                    return state-1;
                else return state
            } 
            else return state;
        case 'REHACER':
            if (action.historico.n < action.historico.values.length) return state + 1;
            else return state;
        default:
            return state;
    }
}
export default movesReducer;