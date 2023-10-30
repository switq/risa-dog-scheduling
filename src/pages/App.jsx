import { useState } from "react";
import IncluirClienteModal from "../components/IncluirClienteModal";
import Modal from "react-modal";
import styled from "styled-components";
import IncluirClienteContext from "../contexts/IncluirClienteContext";

Modal.setAppElement('#root');

const AppContainer = styled.div`
  height: 100vh;
`

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  const initial = {
    id: "",
    nome: "",
    email: "",
    cpf: "",
    dtNasc: "",
    tel1: "",
    tel2: "",
    cep: "",
    logradouro: "",
    numeroRes: "",
    bairro: "",
    localidade: "",
    uf: "",
    animais: [],
    status: '',
  }

  return (
    <AppContainer>
      <button onClick={toggleModal}>Abra</button>

        <IncluirClienteModal
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
          dados={initial}
        />

    </AppContainer>
  );
}

export default App;
