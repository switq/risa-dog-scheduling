export default function desagendar(idExecucao, setSolicitacao, setColaboradores) {
    setSolicitacao((prevSolicitacao) => {
        const newSolicitacao = {...prevSolicitacao}
        const indexExecucao = newSolicitacao.execucoes.findIndex((exec) => exec.idExecucao === idExecucao);
        const execucao = newSolicitacao.execucoes[indexExecucao];

        setColaboradores((prevColaboradores) => {
            const newColaboradores = [...prevColaboradores];
            const indexColaborador = prevColaboradores.findIndex((colab) => colab.idColaborador === execucao.idColaborador);
            const colaborador = newColaboradores[indexColaborador];
            
            const colaboradorAgenda = colaborador.objAgenda.split('');
            const agendaExecucao = execucao.agendaExecucao;

            colaboradorAgenda.forEach((h, i) => {
                colaboradorAgenda[i] = agendaExecucao[i] === '1' ? 0 : colaboradorAgenda[i];
            })
            
            colaborador.objAgenda = colaboradorAgenda.join('');

            return newColaboradores;
        })

        execucao.agendaExecucao = '';

        return newSolicitacao;
    })
}