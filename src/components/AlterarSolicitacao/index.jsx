import Modal from "react-modal";
import Agendamento from "../IncluirSolicitacaoModal/Agendamento";
import { useEffect, useState } from "react";


const alterarSoliStyle = {
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

function AlterarSolicitacao({
    isOpen,
    closeModal,
    solicitacao,
}) {

    const [newSolicitacao, setNewSolicitacao] = useState();

    useEffect(() => {
        setNewSolicitacao(solicitacao)
    }, [solicitacao]);

    function handleClose() {
        closeModal();
    }


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            style={alterarSoliStyle}
        >
            <div>
                <Agendamento

                />
            </div>

        </Modal>
    );
}

export default AlterarSolicitacao;