import { useState } from "react";
import styled from "styled-components";
import { Button } from "../common/Button.style";
import { Step, Foward } from "../common/Step";
import IncluirCliente from "./IncluirCliente";
import IncluirEndereco from "./IncluirEndereco";
import IncluirAnimais from "./IncluirAnimais";
import { Form, Formik } from "formik";
import * as Yup from "yup"
import { BasicInput } from "../common/BasicInput";
import { CRow } from "../common/Containers.style";

const StepContainer = styled(CRow)`
    justify-content: space-around;
    align-itens: flex-start;
`

function IncluirClienteModal() {

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
        nome: "",
        email: "",
        cpf: "",
        dtNasc: "",
        tel1: "",
        tel2: "",
        cep: "",
        logradouro: "",
        numeroRes: "",
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

    const handleSubmit = (values, { setSubmitting }) =>
    {
        console.log(values);
        setSubmitting(false);
    }

    return (
        <div>
            <h2>Incluir Cliente</h2>
            <hr />

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
            
            <div>
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {({ values, isSubimitting }) => (
                        getCompStep()
                    )}
                </Formik>
            </div>

            <div>
                <Button
                    onClick={_ => step !== 0 ? setStep(step - 1) : ""}
                >
                    {step !== 0 ? "Voltar" : "Fechar"}
                </Button>
                <Button 
                    $roxo
                    onClick={_ => step !== 2 ? setStep(step + 1) : 0}
                >
                    {step !== 2 ? "Próximo" : "Salvar"}
                </Button>
            </div>
        </div>
    )
}

export default IncluirClienteModal;