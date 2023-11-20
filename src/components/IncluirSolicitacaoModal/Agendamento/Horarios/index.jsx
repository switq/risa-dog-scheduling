import Modal from 'react-modal'
import style from './Horarios.module.scss'
import { ModalTittle } from '../../../common/Modal.style';
import HoraCard from './HoraCard';
import { Button } from '../../../common/Button.style';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { toast } from "react-toastify";


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
    execucao,
    execucoes,
    agendarHorarios,
    colaboradores,
}) {

    const [horariosIndisponiveis, setHorariosIndisponiveis] = useState();
    const [horariosSelecionados, setHorariosSelecionados] = useState([...agendaMolde]);
    const [inicio, setInicio] = useState();
    const [termino, setTermino] = useState();
    const [colaborador, setColaborador] = useState();
    

    useEffect(() => {
        if (!!execucao.idColaborador) {
            const idColaborador = execucao.idColaborador;
            const idColaboradorConvertido = parseInt(idColaborador);
            const indexColaborador = colaboradores.findIndex((colab) => colab.idColaborador === idColaboradorConvertido);
            const colaboradorObj = _.cloneDeep(colaboradores[indexColaborador]);
            setColaborador(colaboradorObj);
        }

        setHorariosIndisponiveis(gerarIndisponíveis());
        setHorariosSelecionados(gerarSelecionados());
    }, [isOpen, execucao])

    useEffect(() => {
        const newHorariosSelecionados = [...agendaMolde];
        if (inicio >= 0 && termino >= 0) {
            for (let i = inicio; i <= termino; i++) {
                newHorariosSelecionados[i] = 1;
            }
        }
        setHorariosSelecionados(newHorariosSelecionados)
    }, [inicio, termino])

    function submitAgendas() {
        toast.info(`inicio: ${inicio >= 0 ? horarios[inicio].hora : 'não selecionado'} | termino: ${termino > 0 ? horarios[termino].hora : 'não selecionado'}`)

        if (!(inicio >= 0) || !(termino > 0)) {
            toast.warn("Selecione um intervalo de tempo");
            return;
        }

        const newHorariosSelecionados = _.cloneDeep(horariosSelecionados);
        const agendaExecucao = newHorariosSelecionados.join('');
        agendarHorarios(agendaExecucao);
    }

    function toggleHorario(index) {
        if (horariosIndisponiveis[index] === 1) return;

        if (!verificaSelecao(index)) return;

        if (index == inicio) {
            setInicio(termino);
            setTermino();
            return;
        }

        if (index == termino) {
            setTermino();
            return;
        }


        if (!(inicio >= 0)) {
            setInicio(index);
            return;
        }

        if (index > inicio) {
            setTermino(index);
            return;
        }

        if (index < inicio) {
            const newInicio = index;
            const newTermino = inicio;
            setInicio(newInicio);
            setTermino(newTermino);
        }
    }

    function verificaSelecao(index) {
        if (!(inicio >= 0)) return true;

        let inicioR = inicio;
        let indexR = index

        if (index < inicio) {
            inicioR = index;
            indexR = inicio;
        }

        for (let i = inicioR; i < indexR; i++) {
            if (horariosIndisponiveis[i]) return false;
        }

        return true;
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
            for (let i = 0; i < 44; i++) {
                agendaIndisponivel[i] = (execucao.agendaExecucao[i] === '1' ? 0 : (agendaIndisponivel[i] ? 1 : 0))
            }
        }

        return agendaIndisponivel;
    }

    function gerarSelecionados() {
        if (!execucoes || !colaborador || !execucao) return [...agendaMolde];

        // reset inicio e fim
        setInicio();
        setTermino();
        const horariosSelecionados = [];

        for (let i = 0; i < 44; i++) {
            horariosSelecionados[i] = execucao.agendaExecucao[i] == '1' ? 1 : 0;
        }

        horariosSelecionados.forEach((h, i) => {
            if (h && !horariosSelecionados[i - 1]) {
                setInicio(i);
            }
            else if (h && !horariosSelecionados[i + 1]) {
                setTermino(i)
            }
        })


        return horariosSelecionados;
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
                                        $ativo={(inicio === index) || (termino === index)}
                                        $meio={horariosSelecionados[index]}
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