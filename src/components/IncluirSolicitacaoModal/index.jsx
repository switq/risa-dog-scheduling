import { useEffect, useState } from "react";
import { Button } from "../common/Button.style";
import { Step, Foward } from "../common/Step";
import Modal from "react-modal";
import { ModalTittle } from "../common/Modal.style";
import { BackFowardWrapper, StepContainer } from '../common/Step'
import { v4 as uuid4 } from 'uuid';
import NovaSolicitacao from "./NovaSolicitacao";
import Agendamento from "./Agendamento";
import Pagamento from "./Pagamento";
import style from "./IncluirSolicitacaoModal.module.scss";
import { getServicos } from "../../connection/ManterSolicitacoes";

const incluirSolicitacaoStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '900px',
    height: '750px',
    borderRadius: '15px',
    padding: '3rem',
    overflowX: 'hidden',
  },
}

function IncluirSolicitacaoModal({ dadosSolicitacao = false, closeModal, isOpen, ...props }) {
  const [step, setStep] = useState(0);
  const Steps = ["Nova Solicitação", "Agendamento", "Pagamento"];

  // States solicitacao
  const [cliente, setCliente] = useState();
  const [animalSelecionado, setAnimalSelecionado] = useState();
  const [solicitacao, setSolicitacao] = useState();
  const [colaboradores, setColaboradores] = useState();
  const [servicos, setServicos] = useState();

  useEffect(() => {
    carregarServicos();
  }, [isOpen])

  useEffect(() => {
    if (dadosSolicitacao) {
      return
    } else {
      setSolicitacao({
        idSolicitacao: '',
        idCliente: '',
        idAnimal: '',
        data: '',
        horaInicio: '',
        horaTermino: '',
        preco: '',
        desconto: '',
        status: '',
        idEspecialidade: '',
        execucoes: [],
      })
    }
  }, [dadosSolicitacao])

  function carregarServicos() {
    getServicos()
      .then((res) => res.data)
      .then((servs) => setServicos(servs))
  }

  function verificarCliente() {
    return animalSelecionado && cliente;
  }

  const getCompStep = () => {
    switch (step) {
      case 0:
        return <NovaSolicitacao
          cliente={cliente}
          setCliente={setCliente}
          animalSelecionado={animalSelecionado}
          setAnimalSelecionado={setAnimalSelecionado}
        />;
      case 1:
        return <Agendamento
          cliente={cliente}
          animalSelecionado={animalSelecionado}
          solicitacao={solicitacao}
          setSolicitacao={setSolicitacao}
          colaboradores={colaboradores}
          setColaboradores={setColaboradores}
          servicos={servicos}
        />;
      case 2:
        return <Pagamento />;
    }
  }

  return (
    <Modal
      onRequestClose={closeModal}
      style={incluirSolicitacaoStyle}
      isOpen={isOpen}
      {...props}
    >

      <div className={style.container}>
        <div>
          <ModalTittle>{Steps[step]}</ModalTittle>

          <StepContainer>
            {Steps.map((item, index) => (
              <>
                {index ? <Foward key={uuid4}>{">"}</Foward> : ""}
                <Step
                  key={index}
                  $ativo={index === step}
                  style={{ width: '14rem' }}
                  // onClick={_ => setStep(index)}
                >
                  {item}
                </Step>
              </>
            ))}
          </StepContainer>

          {getCompStep()}
        </div>

        <BackFowardWrapper>
          <Button
            onClick={_ => step !== 0 ? setStep(step - 1) : closeModal()}
            type={"button"}
          >
            {step !== 0 ? "Voltar" : "Fechar"}
          </Button>
          <Button
            $roxo
            onClick={(e) => {
              if (step === 0) {
                if (verificarCliente()) {
                  setStep(step + 1);
                };
              }
              else if (step == 1) {
                setStep(step + 1);;
              }
              else if (step === 2) {
                setStep(0);
              }
            }}
            type={"button"}
          >
            {step !== 2 ? "Próximo" : "Salvar"}
          </Button>
        </BackFowardWrapper>
      </div>

    </Modal>
  );
}

export default IncluirSolicitacaoModal;
