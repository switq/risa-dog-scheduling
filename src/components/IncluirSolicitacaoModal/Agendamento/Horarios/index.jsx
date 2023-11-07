import Modal from 'react-modal'
import style from './Horarios.module.scss'
import { ModalTittle } from '../../../common/Modal.style';
import HoraCard from './HoraCard';
import { Button } from '../../../common/Button.style';
import { useState } from 'react';

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
for(let i = 0; i < 44; i++) {
    agendaMolde.push(0);
}

// Teste
const agendaFunc = [...agendaMolde]
agendaFunc[12] = 1;
agendaFunc[13] = 1;


function Horarios({colaborador}) {
    const [horariosSelecionados, setHorariosSelecionados] = useState([...agendaMolde]);

    function toggleHorario(index) {
        if (agendaFunc[index]) return;
        const newAgenda = [...horariosSelecionados];
        newAgenda[index] = newAgenda[index] ? 0 : 1;
        setHorariosSelecionados(newAgenda);
    }
    
    return (
        <Modal
            isOpen={true}
            style={horariosStyle}
        >
            <div className={style.horarioContainer}>
                <div>
                    <ModalTittle>Diogo G.</ModalTittle>
                    <div className={style.horasContainer}>
                        {
                            horarios.map((hor, index) => (
                                <HoraCard
                                    hora={hor.hora}
                                    ativo={horariosSelecionados[index]}
                                    desativado={agendaFunc[index]}
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
        </Modal>
    );
}

export default Horarios;