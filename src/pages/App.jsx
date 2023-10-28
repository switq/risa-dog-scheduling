import { useState } from "react";
import IncluirClienteModal from "../components/IncluirClienteModal";
import Modal from "react-modal";

Modal.setAppElement('#root');

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  return (
    <div>
      <button onClick={toggleModal}>Abra</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
      >
        <IncluirClienteModal/>

      </Modal>
    </div>
  );
}

export default App;
