function movesReducer(state = 0, action) {
    switch (action.type) {
        case 'PLAY_POSITION':
            return state + 1;
        case 'RESET':
            return 0;
        case 'DESHACER':
            if(state>0)return state-1;
            else return state;
        default:
            return state;
    }
}
export default movesReducer;