import { useEffect, useState } from "react";
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
import style from './IncluirClienteModal.module.scss';
import { BackFowardWrapper, StepContainer } from '../common/Step'
import { v4 as uuid4 } from 'uuid';
import { incluirCliente, alterarCliente } from "../../connection/ManterClienteAnimais";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { putClienteAnimais } from "../../connection/ManterClienteAnimais";


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
    dados, closeModal, isOpen, ...props }) {

    const [cliente, setCliente] = useState();

    useEffect(() => {
        setCliente(dados);
    }, [dados])


    async function handleSubmit(values, { setSubmitting }) {
        setStep(0);

        try {
            let response;

            if (values.idCliente == '') {
                console.log('post')
                values.animais = [...cliente.animais];
                response = await incluirCliente(values);
            }
            else {
                console.log('put')
                response = await putClienteAnimais(values.idCliente, values);
            }

            toast.success(response.data.message);
            console.log(response);
            setCliente((prevCliente) => {
                prevCliente.animais = []
                return prevCliente;
            });
            closeModal();

        } catch (error) {

            console.log(JSON.parse(error.request.response).error);
            toast.error(JSON.parse(error.request.response).error);
        }
    }

    let [step, setStep] = useState(0)
    const Steps = ["Dados do cliente", "Endereço", "Animais"];

    const getCompStep = (values, setFieldValue = '') => {
        switch (step) {
            case 0:
                return <IncluirCliente />;
            case 1:
                return <IncluirEndereco values={values} setFieldValue={setFieldValue} />;
            case 2:
                return <IncluirAnimais cliente={cliente} setCliente={setCliente} />;
            default:
                return <IncluirCliente />;

        }
    }

    const initialValues = cliente ;
    console.log('initial')
    console.log(initialValues)

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
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={incluirClienteStyle}
        >
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
                className={style.formik}
            >
                {({ values, isSubimitting, setFieldValue }) => (
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

                            {getCompStep(values, setFieldValue)}
                        </CCol>

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