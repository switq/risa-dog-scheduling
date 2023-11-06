import { useState } from "react";
import IncluirClienteModal from "../components/IncluirClienteModal";
import Modal from "react-modal";
import styled from "styled-components";
import IncluirSolicitacaoModal from "../components/IncluirSolicitacaoModal";
import { ToastContainer } from "react-toastify";

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
        
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AppContainer>
  );
}

export default App;
