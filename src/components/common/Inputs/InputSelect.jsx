import styled from "styled-components";
import React from "react";
import { Field, ErrorMessage } from "formik";

const { InputWrapper, Label, RequiredLabel, FieldStyled, ErrorStyled } = styles();

export const InputSelect = ({ name, label, options, required, ...props }) => {
    return (
        <InputWrapper>
            <Label>
                {label || name}
                {required && <RequiredLabel>*</RequiredLabel>}
            </Label>
            <Field as={FieldStyled} name={name} autoComplete="off" {...props}>
                {options.map((opt, index) => (
                    <option value={opt.value}>{opt.label}</option>
                ))}
            </Field>
            <ErrorMessage name={name} component={ErrorStyled} />
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

    const FieldStyled = styled.select`
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
