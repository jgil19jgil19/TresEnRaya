function jugadoresReducer(state = {PLAYERX:'humano', PLAYER0:'humano'}, action) {
    
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
            return state;
        case 'CAMBIAMODO':
             let nuevo=JSON.parse(JSON.stringify(state))
             nuevo[action.jugador]=action.modo;
             return nuevo;
        default:
            return state;
    }
}
export default jugadoresReducer;