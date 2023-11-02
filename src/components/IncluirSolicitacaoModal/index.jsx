import { useState } from "react";
import { Button } from "../common/Button.style";
import { Step, Foward } from "../common/Step";
import Modal from "react-modal";
import { ModalTittle } from "../common/Modal.style";
import { BackFowardWrapper, StepContainer } from '../common/Step'
import { v4 as uuid4 } from 'uuid';
import NovaSolicitacao from "./NovaSolicitacao";
import Agendamento from "./Agendamento/Agendamento";
import Pagamento from "./Pagamento/Pagamento";
import style from "./IncluirSolicitacaoModal.module.scss";

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

function IncluirSolicitacaoModal() {
  const [step, setStep] = useState(1);
  const Steps = ["Nova Solicitação", "Agendamento", "Pagamento"];

  const getCompStep = () => {
    switch (step) {
      case 0:
        return <NovaSolicitacao />;
      case 1:
        return <Agendamento />;
      case 2:
        return <Pagamento />;
      default:
        return <NovaSolicitacao />;
    }
  }

  return (
    <Modal
      isOpen={true}
      style={incluirSolicitacaoStyle}
    >
      
      <div className={style.container}>
        <div>
          <ModalTittle>Nova Solicitação</ModalTittle>

          <StepContainer>
            {Steps.map((item, index) => (
              <>
                {index ? <Foward key={uuid4}>{">"}</Foward> : ""}
                <Step
                  key={index}
                  $ativo={index === step}
                  onClick={_ => setStep(index)}
                  style={{width: '14rem'}}
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
            onClick={_ => step !== 0 ? setStep(step - 1) : ""}
            type={"button"}
          >
            {step !== 0 ? "Voltar" : "Fechar"}
          </Button>
          <Button
            $roxo
            onClick={(e) => {
              if (step !== 2) {
                setStep(step + 1);
                e.target.type = "button";
              }
              else {
                e.target.type = "submit";
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
