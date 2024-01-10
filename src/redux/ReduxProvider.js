import { PLAYERX, VALUES } from '../constants/constants';
import { Provider } from 'react-redux';
import GlobalState from './reducers';
import { createStore } from 'redux';
import React from 'react';
import App from '../components/App';

export default class ReduxProvider extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = { values: VALUES, turn: PLAYERX, moves: 0, historico:{values:[JSON.stringify(VALUES)],n:1},
         finalizado:false, faseTurno:{fase:0,x:-1,y:-1,turno:'X'}, modoPlay:false, jugadores:{PLAYERX:'humano', PLAYER0:'humano'}}
        this.store = createStore(GlobalState, this.initialState);
    }
    render() {
        return (
            <Provider store={this.store}>
                <div style={{ height: '100%' }} >
                    <App store={this.store} />
                </div>
            </Provider>
        );
    }
}