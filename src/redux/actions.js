export function playPosition(x, y, turn, values, reset, historico) {
    return {
        type: 'PLAY_POSITION',
        x: x,
        y: y,
        turn: turn,
        values: values,
        reset: reset,
        historico: historico
    };
}

export function reset() {
    return { type: 'RESET' };
}

export function deshacer(historico, turn) {
    return {
        type: 'DESHACER',
        historico: historico,
        turn: turn
    };
}

export function rehacer(historico, turn) {
    return {
        type: 'REHACER',
        historico: historico,
        turn: turn
    };
}