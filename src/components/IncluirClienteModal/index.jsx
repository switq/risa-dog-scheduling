import { useState } from "react";
import { Button } from "../common/Button.style";
import { Step, Foward } from "../common/Step";
import IncluirCliente from "./IncluirCliente";
import IncluirEndereco from "./IncluirEndereco";
import IncluirAnimais from "./IncluirAnimais";
import { Form, Formik } from "formik";
import * as Yup from "yup"
import { CCol } from "../common/Containers.style";
import Modal from "react-modal";
import { ModalTittle } from "../common/Modal.style";
import IncluirClienteContext from "../../contexts/IncluirClienteContext";
import style from './IncluirClienteModal.module.scss';
import { BackFowardWrapper, StepContainer } from '../common/Step'
import { v4 as uuid4 } from 'uuid';
import { incluirCliente, alterarCliente } from "../../connection/ManterClienteAnimais";
import axios from "axios";
import { toast } from "react-toastify";
import { toastSuccessStyle } from "../../styles/ToastsStyles";
import 'react-toastify/dist/ReactToastify.css';


const incluirClienteStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '750px',
        height: '650px',
        borderRadius: '15px',
        padding: '3rem',
        overflowX: 'hidden',
    },
}

function IncluirClienteModal({
    dados =
    {
        id: 11,
        nome: "Teste Boy",
        email: "test@test",
        cpf: "12345678901",
        dtNasc: "2023-11-02",
        tel1: "11233334444",
        tel2: "1133334444",
        cep: "05699-430",
        logradouro: "Rua das Tralala",
        numeroRes: 12,
        bairro: "Campo Sujo",
        localidade: "São Paulo",
        uf: "SP",
        complemento: 'casa',
        animais: [],
    }, ...props }) {

    const [cliente, setCliente] = useState(dados);
    
    async function handleSubmit(values, { setSubmitting }) {
        setStep(0);
        console.log(values);
        
        try {
            let response;

            if (values.id == '') {
                console.log('post')
                response = await incluirCliente(values);
            }
            else {
                console.log('put')
                response = await alterarCliente(values);
            } 

            toast.success("Deu");
            console.log(response);
            
        } catch (error) {
            console.log(error.request.response);
            console.log('n deu')
        }        
    }

    let [step, setStep] = useState(0)
    const Steps = ["Dados do cliente", "Endereço", "Animais"];

    const getCompStep = _ => {
        switch (step) {
            case 0:
                return <IncluirCliente />;
            case 1:
                return <IncluirEndereco />;
            case 2:
                return <IncluirAnimais cliente={cliente} setCliente={setCliente} />;
            default:
                return <IncluirCliente />;
                
        }
    }

    const initialValues = { ...cliente };

    const validationSchema = Yup.object({
        nome: Yup.string()
            .min(1, "O nome deve possuir no mínimo 1 letra")
            .required("Campo obrigatório"),
        email: Yup.string()
            .email("E-mail inválido"),
        cpf: Yup.string()
            .min(11, "O CPF deve possuir 11 caracteres")
            .max(11, "O CPF deve possuir 11 caracteres")
            .required("Campo obrigatório"),
        dtNasc: Yup.date()
            .max(new Date(), "Não é possível incluir uma data futura"),
        // lembrar de colocar uma data minima se possivel
        tel1: Yup.string()
            .max(13, "O número de celular deve possuir no máximo 13 caracteres")
            .required("Campo obrigatório"),
        tel2: Yup.string()
            .max(12, "O número de telefone residencial deve possuir no máximo 12 caracteres"),
        cep: Yup.string()
            .min(9, "O CEP deve possuir 9 caracteres")
            .max(9, "O CEP deve possuir 9 caracteres")
            .required("Campo obrigatório"),
        numeroRes: Yup.string()
            .required("Campo obrigatório"),

    });

    return (
        <IncluirClienteContext.Provider value={{ cliente, setCliente }}>
            <Modal
                {...props}
                style={incluirClienteStyle}
            >
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    className={style.formik}
                >
                    {({ values, isSubimitting }) => (
                        <Form key={uuid4} className={style.form}>

                            <CCol gap="0">
                                <ModalTittle>{Steps[step]}</ModalTittle>

                                <StepContainer>
                                    {Steps.map((item, index) => (
                                        <>
                                            {index ? <Foward key={uuid4}>{">"}</Foward> : ""}
                                            <Step
                                                key={index}
                                                $ativo={index === step}
                                                onClick={_ => setStep(index)}
                                            >
                                                {item}
                                            </Step>
                                        </>
                                    ))}
                                </StepContainer>

                                {getCompStep()}
                            </CCol>

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
                                    disabled={isSubimitting}
                                >
                                    {step !== 2 ? "Próximo" : "Salvar"}
                                </Button>
                            </BackFowardWrapper>

                        </Form>
                    )}
                </Formik>
            </Modal>
        </IncluirClienteContext.Provider>
    )
}

export default IncluirClienteModal;