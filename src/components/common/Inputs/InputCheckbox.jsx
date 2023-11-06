import styled from "styled-components";
import React from "react";

const { InputWrapper, Label, RequiredLabel, FieldStyled, ErrorStyled } = styles();

export const InputCheckbox = ({ name, value, onChange, label, required, ...props }) => {
    return (
        <InputWrapper>
            <FieldStyled value={value} onChange={onChange} name={name} type="checkbox" autoComplete="off" {...props} />
            <Label>
                {label || name}
                {required && <RequiredLabel>*</RequiredLabel>}
            </Label>
        </InputWrapper>
    )
};

function styles() {
    const InputWrapper = styled.div`
    display: flex;
    gap: .3em;
    align-items: center;
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
