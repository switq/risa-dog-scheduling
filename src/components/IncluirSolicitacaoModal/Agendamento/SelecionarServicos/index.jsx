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
    solicitacao,
    setSolicitacao,
    setColaboradores,
    execucoes, 
    colaboradores, 
}) {


    const [servicosSelecionado, setServicosSelecionado] = useState([...execucoes]);

    useEffect(() => {
        setServicosSelecionado([...execucoes])
    }, [isOpen])

    function servSelect(serv) {
        const newServicosSelecionado = [...servicosSelecionado];
        const index = newServicosSelecionado.findIndex(exec => exec.idServico === serv.id);

        if(index === -1) {
            newServicosSelecionado.push({
                idServico: serv.id,
                nomeServico: serv.nome,
                idExecucao: uuid4(),
                idColaborador: '',
                nomeColaborador: '',
                idEspecialidade: '',
                agendaExecucao: '0000000000000000000000000000000000000000011',
                adicional: 0,
            })
        } else {
            newServicosSelecionado.splice(index, 1);
        }

        setServicosSelecionado(newServicosSelecionado);
    }

    async function submitChanges() {
        const newSolicitacao = _.cloneDeep(solicitacao);
        let oldExecucoes = _.cloneDeep(newSolicitacao.execucoes);

        // Desagendar execucoes removidas

        oldExecucoes.forEach(async function (oldExec) {
            const oldExecId = oldExec.idExecucao;
            const indexExecImutado = servicosSelecionado.findIndex((newExec) => newExec.idExecucao === oldExecId);
            if (indexExecImutado === -1) {
                await desagendar(oldExecId, setSolicitacao, setColaboradores, colaboradores, solicitacao, oldExec.agendaExecucao)
            };
        })

        newSolicitacao.execucoes = servicosSelecionado;

        await setSolicitacao((prevSolicitacao) => {
            return newSolicitacao
        });
        console.log(solicitacao)
        closeModal();
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
                                ativo={servicosSelecionado.reduce((acc, exec) => acc || (exec.idServico == serv.id), false)}
                                onClick={e => servSelect(serv)}
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