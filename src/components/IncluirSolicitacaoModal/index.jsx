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
import { getServicos, postSolicitacao } from "../../connection/ManterSolicitacoes";
import _ from "lodash"
import { toast } from "react-toastify";

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

const initialSolicitacao = {
  idSolicitacao: '',
  data: '',
  horaInicio: '',
  horaTermino: '',
  preco: 0,
  desconto: 0,
  status: '',
  idColaborador: '',
  execucoes: [],

  idCliente: '',
  nomeCliente: '',

  idAnimal: '',
  nomeAnimal: '',
  especie: '',
  porte: '',
}

function IncluirSolicitacaoModal({ closeModal, isOpen, ...props }) {
  const [step, setStep] = useState(0);
  const Steps = ["Nova Solicitação", "Agendamento"];

  // States solicitacao
  const [cliente, setCliente] = useState();
  const [animalSelecionado, setAnimalSelecionado] = useState();
  const [solicitacao, setSolicitacao] = useState();
  const [colaboradores, setColaboradores] = useState();
  const [servicos, setServicos] = useState();

  useEffect(() => {
    carregarServicos();
    setSolicitacao(_.cloneDeep(initialSolicitacao));
  }, [isOpen])

  function resetSolicitacao() {
    setSolicitacao(_.cloneDeep(initialSolicitacao));
    setAnimalSelecionado(null);
    setCliente(null);
    setStep(0);
  }

  function carregarServicos() {
    getServicos()
      .then((res) => res.data)
      .then((servs) => setServicos(servs))
  }

  function verificarCliente() {
    return animalSelecionado && cliente;
  }

  function adicionarCliente() {
    const dadosClienteAnimal = {
      idCliente: cliente.idCliente,
      nomeCliente: cliente.nome,

      idAnimal: animalSelecionado.idAnimal,
      nomeAnimal: animalSelecionado.nome,
      especie: animalSelecionado.especie,
      porte: animalSelecionado.porte,
    }

    const newSolicitacao = { ..._.cloneDeep(solicitacao), ...dadosClienteAnimal };
    setSolicitacao(newSolicitacao);
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

  const handleSubmit = async () => {
    const userToken = localStorage.getItem("user_token")
    if (!userToken) {
      toast.error("Usuário não logado");
      return;
    }

    console.log(solicitacao)

    try {
      const user = JSON.parse(userToken).usuario
      const values = {
        ..._.cloneDeep(solicitacao),
        idColaborador: user.idColaborador
      };

      const res = await postSolicitacao(values);

    } catch (error) {
      console.log(error)
    }

  }


  return (
    <Modal
      onRequestClose={e => {
        resetSolicitacao();
        closeModal();

        
      }}
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
            onClick={_ => {
              if (step === 0)
                closeModal()

              resetSolicitacao()
              setStep(step - 1)
            }}
            type={"button"}
          >
            {step !== 0 ? "Voltar" : "Fechar"}
          </Button>
          <Button
            $roxo
            onClick={(e) => {
              if (step === 0) {
                if (verificarCliente()) {
                  adicionarCliente()
                  setStep(step + 1);
                };
              }
              else if (step == 1) {
                handleSubmit();
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
