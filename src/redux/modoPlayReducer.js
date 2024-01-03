function modoPlayReducer(state = false, action) {
    switch (action.type) {
        case 'PLAY_POSITION':
            return state;
        case 'RESET':
            return state;
        case 'DESHACER':
            return state;
        case 'REHACER':
            return state;
        case 'REPLAY': 
            //alert(JSON.stringify(action))
            if(action.historico.n===action.vez+1) return false;
            else return true;
        default:
            return state;
    }
}
export default modoPlayReducer;