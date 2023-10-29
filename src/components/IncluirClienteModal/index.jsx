import { useState } from "react";
import styled from "styled-components";
import { Button } from "../common/Button.style";
import { Step, Foward } from "../common/Step";
import IncluirCliente from "./IncluirCliente";
import IncluirEndereco from "./IncluirEndereco";
import IncluirAnimais from "./IncluirAnimais";
import { Form, Formik } from "formik";
import * as Yup from "yup"
import { CRow, CCol, CRowStyle, CColStyle } from "../common/Containers.style";
import Modal from "react-modal";
import { ModalTittle } from "../common/Modal.style";

const StepContainer = styled(CRowStyle)`
    justify-content: space-between;
    align-itens: flex-start;
`

const BackFowardWrapper = styled(CRowStyle)`
    justify-content: space-between;
    margin-top: 4rem
`

const incluirClienteStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '650',
        height: '650px',
        borderRadius: '15px',
        padding: '3rem'
    },
}


function IncluirClienteModal({ ...props }) {

    let [step, setStep] = useState(0)
    const Steps = ["Dados do cliente", "Endereço", "Animais"];

    const getCompStep = _ => {
        switch (step) {
            case 0:
                return <IncluirCliente />;
            case 1:
                return <IncluirEndereco />;
            case 2:
                return <IncluirAnimais />;
            default:
                return <IncluirCliente />;
        }
    }

    const initialValues = {
        nome: "111",
        email: "",
        cpf: "11111111111",
        dtNasc: "",
        tel1: "33",
        tel2: "",
        cep: "111113111",
        logradouro: "",
        numeroRes: "4",
        bairro: "",
        localidade: "",
        uf: "",
    };

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

    const handleSubmit = (values, { setSubmitting }) => {
        console.log(values);
        // setSubmitting(false);
        setStep(0);
    }

    return (
        <Modal
            {...props}
            style={incluirClienteStyle}
        >
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {({ values, isSubimitting }) => (
                    <Form>

                        <CCol gap="0" margin-bottom="2em">
                            <ModalTittle>{Steps[step]}</ModalTittle>

                            <StepContainer>
                                {Steps.map((item, index) => (
                                    <>
                                        {index ? <Foward>{">"}</Foward> : ""}
                                        <Step
                                            $ativo={index === step}
                                            key={index}
                                            onClick={_ => setStep(index)}
                                        >
                                            {item}
                                        </Step>
                                    </>
                                ))}
                            </StepContainer>
                        </CCol>

                        {getCompStep()}

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
    )
}

export default IncluirClienteModal;