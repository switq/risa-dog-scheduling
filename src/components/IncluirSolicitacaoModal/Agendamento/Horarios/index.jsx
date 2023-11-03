import Modal from 'react-modal'
import style from './Horarios.module.scss'
import { ModalTittle } from '../../../common/Modal.style';
import HoraCard from './HoraCard';
import { Button } from '../../../common/Button.style';

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

let horarios = [];

for (let i = 9; i < 20; i++) {
    for (let j = 0; j < 60; j += 15) {
        horarios.push({ hora: `${i}:${j === 0 ? `0${j}` : j}` })
    }
}

console.log(horarios)

function Horarios() {
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
                                <HoraCard hora={hor.hora} />
                            ))
                        }
                    </div>
                </div>
                <Button $roxo>Confirmar</Button>
            </div>
        </Modal>
    );
}

export default Horarios;