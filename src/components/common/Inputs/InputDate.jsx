import styled from "styled-components";
import React from "react";

const { InputWrapper, Label, RequiredLabel, FieldStyled, ErrorStyled } = styles();

export const InputSearch = ({ name, value, onChange, label, required, ...props }) => {
    return (
        <InputWrapper>
            <Label>
                {label || name}
                {required && <RequiredLabel>*</RequiredLabel>}
            </Label>
            <FieldStyled value={value} onChange={onChange} name={name} type="search" autoComplete="off" {...props} />
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
