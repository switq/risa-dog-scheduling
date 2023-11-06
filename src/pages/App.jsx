import { ToastContainer } from "react-toastify"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AgendasDia from './AgendasDia'
import Modal from 'react-modal'

function App() {

  Modal.setAppElement('#root');


  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<AgendasDia />}  />
          <Route path="/agendas" element={<AgendasDia />} />
        </Routes>
      </Router>

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
