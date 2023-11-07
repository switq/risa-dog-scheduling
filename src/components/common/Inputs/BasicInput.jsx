import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Field, ErrorMessage } from "formik";

const { InputWrapper, Label, RequiredLabel, FieldStyled, ErrorStyled } = styles();


export const BasicInput = ({ name, type = "", label, required, values=false, ...props}) => {
    
    const [Conteudo, setConteudo] = useState('');

    function atualizaConteudo() {
        if (values) setConteudo(values[name]);
        else setConteudo('');
    }

    useEffect(() => {
        atualizaConteudo()
    }, [values])



    return (
        <InputWrapper>
            <Label>
                {label || name}
                {required && <RequiredLabel>*</RequiredLabel>}
            </Label>

            <Field as={FieldStyled} style={{ display: !values ? 'inlineBlock' : 'none' }} name={name} type={type} autoComplete="off" {...props} />
            <FieldStyled readOnly value={Conteudo} style={{ display: values ? 'inlineBlock' : 'none', color: '#777' }} />
            
            <ErrorMessage name={name} component={ErrorStyled}/>
        </InputWrapper>
    )
};

function styles() {
    const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: .3em;
    flex-grow: ${props => props.flexG ? props.flexG : "1"};
`;

    const FieldStyled = styled.input`
    border-radius: 0.3rem;
    border: none;
    padding: .5em;
    background: var(--gray);
    outline: none;
    height: 2.2em;

    &:focus {
        outline: 2px solid #999;
    }
`;

    const Label = styled.label`
    text-transform: capitalize;
`;

    const RequiredLabel = styled.span`
    color: red;
`;

    const ErrorStyled = styled.span`
    color: red;
    font-size: 14px;
`;
    return { InputWrapper, Label, RequiredLabel, FieldStyled, ErrorStyled };
}
