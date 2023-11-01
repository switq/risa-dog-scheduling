import { useState } from "react";
import IncluirClienteModal from "../components/IncluirClienteModal";
import Modal from "react-modal";
import styled from "styled-components";
import IncluirSolicitacaoModal from "../components/IncluirSolicitacaoModal";

Modal.setAppElement('#root');

const AppContainer = styled.div`
  height: 100vh;
`

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  return (
    <AppContainer>
      <button onClick={toggleModal}>Abra</button>

        <IncluirClienteModal
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
        />

        <IncluirSolicitacaoModal />

    </AppContainer>
  );
}

export default App;
