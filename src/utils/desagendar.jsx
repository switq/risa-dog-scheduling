import _ from 'lodash';

export default function desagendar(idExecucao, setSolicitacao, setColaboradores, colaboradores, solicitacao, horariosADesagendar=false) {
    const newSolicitacao = _.cloneDeep(solicitacao);

    const indexExecucao = newSolicitacao.execucoes.findIndex((exec) => exec.idExecucao === idExecucao);
    const execucao = newSolicitacao.execucoes[indexExecucao];

    if (!colaboradores || !execucao.idColaborador) {

    } else {
        const newColaboradores = _.cloneDeep(colaboradores);

        const indexColaborador = colaboradores.findIndex((colab) => {
            return colab.idColaborador === execucao.idColaborador
        });

        const colaborador = newColaboradores[indexColaborador];

        let agendaExecucao = '' + execucao.agendaExecucao;
        if(horariosADesagendar) agendaExecucao = horariosADesagendar;
        const colaboradorAgenda = colaborador.objAgenda.split('');

        for (let i = 0; i < 44; i++) {
            colaboradorAgenda[i] = agendaExecucao[i] == '1' ? '0' : colaboradorAgenda[i];
        }

        colaborador.objAgenda = colaboradorAgenda.join('');
        setColaboradores(newColaboradores);
    }

    execucao.agendaExecucao = '0000000000000000000000000000000000000000000';

    setSolicitacao(newSolicitacao);
}