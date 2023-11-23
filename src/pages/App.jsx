import { ToastContainer } from "react-toastify"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AgendasDia from './AgendasDia'
import Modal from 'react-modal'
import Login from "./Login";
import RoutesApp from "../routes";

function App() {

  Modal.setAppElement('#root');


  return (
    <>
      <RoutesApp />
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
    </>
  );
}

export default App;
