import Modal from 'react-modal'
import { ModalTittle } from '../../../common/Modal.style';
import ServicoCard from './ServicoCard';
import banho from '../../../../assets/img/banho.png'
import tosa from '../../../../assets/img/tosa.png'
import unha from '../../../../assets/img/unha.png'
import escovacao from '../../../../assets/img/escovacao.png'
import style from './SelecionarServicos.module.scss'
import { Button } from '../../../common/Button.style';

const selecionarServicosStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '600px',
        borderRadius: '15px',
        padding: '3rem',
        overflowX: 'hidden',
    },
}

const servicos = [
    {nome: 'Banho', path: banho},
    {nome: 'Tosa', path: tosa},
    {nome: 'Corte de unha', path: unha},
    {nome: 'Escovação', path: escovacao},
]

function SelecionarServicos() {
    return ( 
        <Modal
            // isOpen="true"
            style={selecionarServicosStyle}
        >
            <div className={style.container}>
                <div>
                    <ModalTittle>Selecionar Serviços</ModalTittle>

                    <div className={style.cardsContainer}>
                        {servicos.map((serv, index) => (
                            <ServicoCard texto={serv.nome} path={serv.path} key={index}/>
                        ))}
                    </div>
                </div>

                <div className={style.cardsContainer}>
                    <Button>Cancelar</Button>
                    <Button $roxo>Confirmar</Button>
                </div>
            </div>
        </Modal>
     );
}

export default SelecionarServicos;