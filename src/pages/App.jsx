import { ToastContainer } from "react-toastify"
import Modal from 'react-modal'
import RoutesApp from "../routes";
import { AuthProvider } from "../contexts/auth";

function App() {

  Modal.setAppElement('#root');


  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
