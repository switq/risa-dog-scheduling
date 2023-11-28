import Modal from "react-modal";
import { ModalTittle } from "../common/Modal.style";
import style from './ResumoSolicitacao.module.scss'
import ItemTabelaResumo from "./ItemTabelaResumo";
import PrecoTotal from "../IncluirSolicitacaoModal/Agendamento/Tabela/PrecoTotal";
import BotaoStatus from "./BotaoStatus";
import { Close } from "../../assets/icons/close";
import _ from 'lodash'
import { putSolicitacao } from "../../connection/ManterSolicitacoes";
import { toast } from "react-toastify";

const resumoStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '650px',
        height: '550px',
        borderRadius: '15px',
        padding: '3rem',
        overflowX: 'hidden',
    },
}

function ResumoSolicitacao({
    isOpen,
    closeModal,
    solicitacao,
}) {

    function handleClose(atualizar=false) {
        closeModal(atualizar);
    }

    async function handleChangeStatus(statusAbreviado) {
        const status = statusAbreviado === 'F' ? 'Finalizado' : 'Cancelado';

        try {
            const newSolicitacao = {
                ..._.cloneDeep(solicitacao),
                status: status,
            }
            console.log(newSolicitacao)
            const res = await putSolicitacao(newSolicitacao.idSolicitacao, newSolicitacao)
            toast.success(res.data.message)
            
        }
        catch (error) {
            console.log(error)
        }

        handleClose(true);
    }

    const renderBotoesStatus = () => {
        console.log(solicitacao.status)
        if (solicitacao.status === 'Pendente')
            return (
                <div className={style.botoes}>
                    <BotaoStatus onclick={handleChangeStatus} status={"C"} />
                    <BotaoStatus onclick={handleChangeStatus} status={"F"} />
                </div>
            );
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            style={resumoStyle}
        >
            <div className={style.modalContainer}>
                <div>
                    <span onClick={handleClose} className={style.close}><Close /></span>
                    <ModalTittle>Resumo solicitacão</ModalTittle>

                    <p>{solicitacao.nomeCliente} | {solicitacao.nomeAnimal} - {solicitacao.especie} - {solicitacao.porte}</p>
                    <hr />


                    <table className={style.tabela}>
                        <tr>
                            <th className={style.servicosTh}>Serviço</th>
                            <th className={style.execucaoTh}>Execução</th>
                            <th className={style.horaTh}>Hora</th>
                            <th className={style.totalTh}>Total</th>
                        </tr>
                        {solicitacao.execucoes.map((execucao) => (
                            <ItemTabelaResumo
                                execucao={execucao}
                            />
                        ))}
                    </table>

                    <PrecoTotal
                        solicitacao={solicitacao}
                    />
                </div>

                {renderBotoesStatus()}

            </div>

        </Modal>
    );
}

export default ResumoSolicitacao;