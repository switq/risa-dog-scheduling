import Modal from 'react-modal'
import style from './Horarios.module.scss'
import { ModalTittle } from '../../../common/Modal.style';
import HoraCard from './HoraCard';
import { Button } from '../../../common/Button.style';
import { useState, useEffect } from 'react';
import desagendar from '../../../../utils/desagendar';
import _ from 'lodash';

const horariosStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '650px',
        borderRadius: '15px',
        padding: '3rem',
        overflowX: 'hidden',
    },
}

// Criação dos horaios
let horarios = [];
for (let i = 9; i < 20; i++) {
    for (let j = 0; j < 60; j += 15) {
        horarios.push({ hora: `${i}:${j === 0 ? `0${j}` : j}` })
    }
}

// Molde de agenda vazia
const agendaMolde = []
for (let i = 0; i < 44; i++) {
    agendaMolde.push(0);
}

function Horarios({
    isOpen,
    closeModal,
    colaborador,
    solicitacao,
    setSolicitacao,
    colaboradores,
    setColaboradores,
    execucoes,
    execucao,
}) {

    const [horariosSelecionados, setHorariosSelecionados] = useState([...agendaMolde]);
    const [horariosIndisponiveis, setHorariosIndisponiveis] = useState();

    useEffect(() => {
        setHorariosIndisponiveis(gerarIndisponíveis());
        setHorariosSelecionados(gerarSelecionados());
        
    }, [isOpen])

    function toggleHorario(index) {
        if (horariosIndisponiveis[index] === 1) return
        const newAgenda = [...horariosSelecionados];
        newAgenda[index] = newAgenda[index] ? 0 : 1;
        setHorariosSelecionados(newAgenda);
    }

    function gerarIndisponíveis() {
        if (!execucoes || !colaborador || !execucao) return [...agendaMolde];
        
        let agendaIndisponivel = [...agendaMolde];
        
        // Execuções
        execucoes.forEach((exec) => {
            for (let i = 0; i < 44; i++) {
                agendaIndisponivel[i] = (exec.agendaExecucao[i] === '1' ? 1 : (agendaIndisponivel[i] ? 1 : 0))
            }
        })
        
        // Colaborador ativo
        {
            for (let i = 0; i < 44; i++) {
                agendaIndisponivel[i] = (colaborador.objAgenda[i] === '1' ? 1 : (agendaIndisponivel[i] ? 1 : 0))
            }
        }
        
        // Execução
        {
            console.log('Execucao')
            console.log(execucao)

            for (let i = 0; i < 44; i++) {
                agendaIndisponivel[i] = (execucao.agendaExecucao[i] === '1' ? 0 : (agendaIndisponivel[i] ? 1 : 0))
            }
        }

        return agendaIndisponivel;
    }
    
    function gerarSelecionados() {
        if (!execucoes || !colaborador || !execucao) return [...agendaMolde];
        
        const horariosSelecionados = [];
        
        for(let i = 0; i < 44; i++) {
            horariosSelecionados[i] = execucao.agendaExecucao[i] == '1' ? 1 : 0;
        }

        return horariosSelecionados;
    }

    async function submitAgendas() {
        const newSolicitacao = { ...solicitacao };
        const newExecucao = _.cloneDeep(execucao);
        
        const newExecucaoAgenda = horariosSelecionados.join('');

        newExecucao.agendaExecucao = '' + newExecucaoAgenda;

        const indexExecucao = newSolicitacao.execucoes.findIndex((e) => e.idExecucao === newExecucao.idExecucao);
        newSolicitacao.execucoes[indexExecucao] = newExecucao;

        await desagendar(execucao.idExecucao, setSolicitacao, setColaboradores, colaboradores, solicitacao, execucao.agendaExecucao);
        
        if(!!colaborador) {
            const newColaboradores = _.cloneDeep(colaboradores);
            const indexColaborador = newColaboradores.findIndex((colab) => colab.idColaborador === newExecucao.idColaborador);

            // Agendar no objAgenda do colaborador
            const objAgenda = newColaboradores[indexColaborador].objAgenda.split('');

            for (let i = 0; i < 44; i++) {
                objAgenda[i] = horariosSelecionados[i] ? '1' : objAgenda[i];
            }

            newColaboradores[indexColaborador].objAgenda = objAgenda.join('');

            console.log('colaboradores')
            console.log(newColaboradores)

            await setColaboradores(newColaboradores);
        }

        console.log('newSolicitacao.execucoes')
        console.log(newSolicitacao.execucoes)
        

        setSolicitacao(newSolicitacao);
        
    }
    
    return (
        <Modal
            isOpen={isOpen}
            style={horariosStyle}
            onRequestClose={closeModal}
        >
            {
                !colaborador ? '' : <div className={style.horarioContainer}>
                    <div>
                        <ModalTittle>{colaborador.nomeColaborador}</ModalTittle>
                        <div className={style.horasContainer}>
                            {
                                horarios.map((hor, index) => (
                                    <HoraCard
                                        key={index}
                                        hora={hor.hora}
                                        $ativo={horariosSelecionados[index]}
                                        $desativado={horariosIndisponiveis[index]}
                                        onClick={() => toggleHorario(index)}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    <Button
                        $roxo
                        onClick={submitAgendas}
                    >
                        Confirmar
                    </Button>
                </div>
            }

        </Modal>
    );
}

export default Horarios;