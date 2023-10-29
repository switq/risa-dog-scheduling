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
  const [modalIsOpen, setModalIsOpen] = useState(true);

  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
  }


  return (
    <AppContainer>
      <button onClick={toggleModal}>Abra</button>

      <IncluirClienteContext.Provider
        value={
          {
            nome: "gui",
            email: "",
            cpf: "11111111111",
            dtNasc: "",
            tel1: "33",
            tel2: "",
            cep: "111111111",
            logradouro: "",
            numeroRes: "4",
            bairro: "",
            localidade: "",
            uf: "",
            animais: [],
          }}>

        <IncluirClienteModal
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
        />

      </IncluirClienteContext.Provider>

    </AppContainer>
  );
}

export default App;
