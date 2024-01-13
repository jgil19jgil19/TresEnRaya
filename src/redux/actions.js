export function playPosition(x, y, turn, values, reset, historico, faseTurno, moves) {
    return {
        type: 'PLAY_POSITION',
        x: x,
        y: y,
        turn: turn,
        values: values,
        reset: reset,
        historico: historico,
        faseTurno: faseTurno,
        moves: moves
    };
}

export function reset() {
    return { type: 'RESET' };
}

export function deshacer(historico, turn, moves, faseTurno) {
    return {
        type: 'DESHACER',
        historico: historico,
        turn: turn,
        moves:moves,
        faseTurno:faseTurno
    };
}

export function rehacer(historico, turn, moves, faseTurno) {
    return {
        type: 'REHACER',
        historico: historico,
        turn: turn,
        moves:moves,
        faseTurno:faseTurno
    };
}

export function replay(vez, historico, replay, modoPlay) {
    return {
        type: 'REPLAY',
        vez: vez,
        historico: historico,
        replay: replay,
        modoPlay: modoPlay
    };
}

export function cambiaModo(jugador, modo) {
    return {
        type: 'CAMBIAMODO',
        jugador: jugador,
        modo: modo
    };
}

export function reloj(tx,t0,limite) {
    return {
        type: 'TIC',
        tx,t0,limite
    };
}

export function ponLimite(limite) {
    return {
        type: 'PONLIMITE',
        limite
    };
}