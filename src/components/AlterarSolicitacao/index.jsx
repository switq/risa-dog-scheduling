import Modal from "react-modal";
import Agendamento from "../IncluirSolicitacaoModal/Agendamento";
import { useEffect, useState } from "react";
import { getServicos } from "../../connection/ManterSolicitacoes";
import { getAgendasColaboradores, getAgendasColaboradoresComId } from "../../connection/ManterSolicitacoes";
import { ModalTittle } from "../common/Modal.style";
import { Button } from "../common/Button.style";
import style from './AlterarSolicitacao.module.scss'
import { toast } from "react-toastify";
import _ from 'lodash';
import { putSolicitacao } from "../../connection/ManterSolicitacoes";

const alterarSoliStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '850px',
        height: '700px',
        borderRadius: '15px',
        padding: '3rem',
        overflowX: 'hidden',
    },
}

function AlterarSolicitacao({
    isOpen,
    closeModal,
    solicitacao,
}) {

    const [newSolicitacao, setNewSolicitacao] = useState();
    const [colaboradores, setColaboradores] = useState();
    const [servicos, setServicos] = useState();

    useEffect(() => {
        carregarServicos();
        acessarColaboradores();
        setNewSolicitacao(solicitacao);
    }, [solicitacao, isOpen]);

    async function handleSubmit() {
        const userToken = localStorage.getItem("user_token")
        if (!userToken) {
            toast.error("Usuário não logado");
            return;
        }

        console.log('newSolicitacao')
        console.log(newSolicitacao)

        const ver = verificarSolicitacao()
        if (ver) {
            toast.warn(ver)
            return;
        }

        try {
            const values = {
                ..._.cloneDeep(newSolicitacao),
            };

            const res = await putSolicitacao(values.idSolicitacao, values);

            toast.success("Solicitação registrada!");
            handleClose(true);

        } catch (error) {
            console.log(JSON.parse(error.request.response).message)
            toast.error(JSON.parse(error.request.response).message)
        }
    }


    function handleClose(atualizar = false) {
        closeModal(atualizar);
    }

    function carregarServicos() {
        getServicos()
            .then((res) => res.data)
            .then((servs) => setServicos(servs))
    }

    function acessarColaboradores() {
        if (!solicitacao.idSolicitacao) {
            getAgendasColaboradores(solicitacao.data)
                .then((res) => res.data)
                .then((data) => {
                    console.log(data);
                    setColaboradores([...data.colaboradores])
                })
                .catch((error) => console.log(error));
        } else {
            getAgendasColaboradoresComId(solicitacao.idSolicitacao, solicitacao.data)
                .then((res) => res.data)
                .then((data) => {
                    console.log(data);
                    setColaboradores([...data.colaboradores])
                })
                .catch((error) => console.log(error));
        }
    }

    function renderAgendamento() {
        if (servicos && newSolicitacao && colaboradores) return (
            <Agendamento
                solicitacao={newSolicitacao}
                setSolicitacao={setNewSolicitacao}
                colaboradores={colaboradores}
                setColaboradores={setColaboradores}
                servicos={servicos}
            />
        )
    }

    function verificarSolicitacao() {
        if (!newSolicitacao)
            return 'Solicitacao não existe';

        if (!newSolicitacao.data)
            return "Selecione uma data";

        if (!newSolicitacao.execucoes.length)
            return 'Selecione serviços';

        const execucoes = _.cloneDeep(newSolicitacao.execucoes);

        const isColabSet = execucoes.reduce((acc, exec) => {
            console.log(exec)
            return !!exec.idColaborador && acc
        }, [true])
        if (!isColabSet)
            return 'Selecione os colaboradores'

        const agendas = execucoes.map(exec => exec.agendaExecucao);
        const isHorariosSet = !agendas.includes("00000000000000000000000000000000000000000000");
        if (!isHorariosSet)
            return "Selecione os horários"

        return false;
    }


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            style={alterarSoliStyle}
        >
            <div className={style.container}>
                <div>
                    <ModalTittle style={{ marginBottom: '.5em' }}>Alterar Solicitação</ModalTittle>
                    {renderAgendamento()}

                </div>

                <div className={style.botoes}>
                    <Button onClick={handleClose}>Fechar</Button>
                    <Button onClick={handleSubmit} $roxo>Salvar</Button>
                </div>
            </div>

        </Modal>
    );
}

export default AlterarSolicitacao;