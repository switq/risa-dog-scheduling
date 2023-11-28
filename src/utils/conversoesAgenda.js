const gerarArrayHorarios = (lim = 20) => {
    let horarios = [];
    for (let i = 9; i < lim; i++) {
        for (let j = 0; j < 60; j += 15) {
            horarios.push({ hora: `${i}:${j === 0 ? `0${j}` : j}` })
        }
    }
    return [...horarios];
}

const rangeAgenda = (agenda) => {

    let agendaConvertida;

    for (let i = 0; i < 44; i++) {
        agendaConvertida.push(agenda[i] === '1' ? 1 : 0);
    }

    const horarios = gerarArrayHorarios(40);
    let inicio;
    let termino;

    for (let i = 0; i < 44; i++) {
        if (!inicio && agendaConvertida[i] && !agendaConvertida[i - 1])
            inicio = horarios[i].hora;
        else if (!termino && agendaConvertida[i] && !agendaConvertida[i + 1])
            termino = horarios[i + 1].hora;
    }

    return { inicio, termino };
}



export { gerarArrayHorarios, rangeAgenda };