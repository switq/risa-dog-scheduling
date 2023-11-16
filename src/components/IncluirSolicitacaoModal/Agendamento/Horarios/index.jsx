import Modal from 'react-modal'
import style from './Horarios.module.scss'
import { ModalTittle } from '../../../common/Modal.style';
import HoraCard from './HoraCard';
import { Button } from '../../../common/Button.style';
import { useState, useEffect } from 'react';

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
    agendaMolde[i] = 0;
}

function Horarios({
    isOpen,
    closeModal,
    colaborador,
    execucoes,
}) {

    const [horariosSelecionados, setHorariosSelecionados] = useState([...agendaMolde]);
    const [horariosIndisponiveis, setHorariosIndisponiveis] = useState();

    useEffect(() => {
        setHorariosIndisponiveis(gerarIndisponíveis());
    }, [isOpen])

    function toggleHorario(index) {
        const newAgenda = [...horariosSelecionados];
        newAgenda[index] = newAgenda[index] ? 0 : 1;
        setHorariosSelecionados(newAgenda);
    }

    function gerarIndisponíveis() {
        let agendaIndisponivel = '00000000000000000000000000000000000000000000'
        console.log(execucoes)

        if (!execucoes || !colaborador) return;

        // Execuções
        execucoes.forEach((exec) => {
            let agendaTemp = ''
            for (let i = 0; i < 44; i++) {
                agendaTemp = agendaTemp + (exec.agendaExecucao[i] === '1' ? '1' : agendaIndisponivel[i])
            }
            agendaIndisponivel = agendaTemp;
        })

        // Colaborador ativo
        {
            let agendaTemp = ''
            for (let i = 0; i < 44; i++) {
                agendaTemp = agendaTemp + (colaborador.objAgenda[i] === '1' ? '1' : agendaIndisponivel[i])
            }
            agendaIndisponivel = agendaTemp;
        }

        return agendaIndisponivel;
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
                                        ativo={horariosSelecionados[index] == 1}
                                        desativado={horariosIndisponiveis[index] == 0}
                                        onClick={() => toggleHorario(index)}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    <Button
                        $roxo
                        onClick={() => console.log(horariosSelecionados)}
                    >
                        Confirmar
                    </Button>
                </div>
            }

        </Modal>
    );
}

export default Horarios;