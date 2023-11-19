import Modal from 'react-modal'
import { ModalTittle } from '../../../common/Modal.style';
import ServicoCard from './ServicoCard';
import banho from '../../../../assets/img/banho.png'
import tosa from '../../../../assets/img/tosa.png'
import unha from '../../../../assets/img/unha.png'
import escovacao from '../../../../assets/img/escovacao.png'
import style from './SelecionarServicos.module.scss'
import { Button } from '../../../common/Button.style';
import { useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import { useEffect } from 'react';
import desagendar from '../../../../utils/desagendar';
import _ from 'lodash';


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
    { id: 1, nome: 'Banho', path: banho },
    { id: 2, nome: 'Tosa', path: tosa },
    { id: 3, nome: 'Corte de unha', path: unha },
    { id: 4, nome: 'Escovação', path: escovacao },
]

function SelecionarServicos({ 
    isOpen, 
    closeModal,
    alterarServicos,
    execucoes,
}) {

    const [servicosSelecionados, setServicosSelecionados] = useState([]);

    async function submitChanges() {
        alterarServicos([...servicosSelecionados]);
        closeModal();
    }

    useEffect(() => {
        gerarSelecionados();
    }, [isOpen]) 

    
    function gerarSelecionados() {
        const servicosJaSelecionados = execucoes.map((exec) => exec.idServico);
        setServicosSelecionados([...servicosJaSelecionados]);
    }

    function toggleServico(idServico) {
        const newServicosSelecionados = [...servicosSelecionados];
        const servicoIndex = servicosSelecionados.findIndex((serv) => serv === idServico);
        if (servicoIndex === -1) {
            newServicosSelecionados.push(idServico);
        } else {
            newServicosSelecionados.splice(servicoIndex, 1);
        }
        setServicosSelecionados(newServicosSelecionados)
    }

    function verificaAtivo(idServico) {
        return servicosSelecionados.includes(idServico);
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={selecionarServicosStyle}
        >
            <div className={style.container}>
                <div>
                    <ModalTittle>Selecionar Serviços</ModalTittle>

                    <div className={style.cardsContainer}>
                        {servicos.map((serv, index) => (
                            <ServicoCard
                                ativo={verificaAtivo(serv.id)}
                                onClick={e => toggleServico(serv.id)}
                                texto={serv.nome}
                                path={serv.path}
                                key={index}
                            />
                        ))}
                    </div>
                </div>

                <div className={style.cardsContainer}>
                    <Button onClick={closeModal}>Cancelar</Button>
                    <Button
                        $roxo
                        onClick={submitChanges}
                    >
                        Confirmar
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default SelecionarServicos;