import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Legendas from "./Legendas";
import { Button } from "../../components/common/Button.style";
import style from "./AgendasDia.module.scss";
import { InputDate } from "../../components/common/Inputs/InputDate";
import { InputCheckbox } from "../../components/common/Inputs/InputCheckbox";
import SolicitacaoCard from "../../components/SolicitacaoRail/SolicitacaoCard";
import IncluirSolicitacaoModal from "../../components/IncluirSolicitacaoModal";
import ResumoSolicitacao from "../../components/ResumoSolicitacao";
import { getListaSolicitacao } from "../../connection/ManterSolicitacoes";
import _ from 'lodash';
import SolicitacaoRail from "../../components/SolicitacaoRail";
import AlterarSolicitacao from "../../components/AlterarSolicitacao";
import React from 'react';
import Spinner from '@atlaskit/spinner';



function AgendasDia() {
    const [listaSolicitacoes, setListaSolicitacoes] = useState([]);

    const [solicitacaoIsOpen, setSolicitacaoIsOpen] = useState(false);
    function openSolicitacao() {
        setSolicitacaoIsOpen(true);
    }
    const closeSolicitacao = () => {
        setSolicitacaoIsOpen(false);
        atualizarLista();
    }

    const [selectedSolicitacao, setSelectedSolicitacao] = useState();
    const [resumoIsOpen, setResumoIsOpen] = useState(false);
    async function openResumo(solicitacao) {
        if (!solicitacao) return;
        await setSelectedSolicitacao(solicitacao);
        setResumoIsOpen(true);
    }
    function closeResumo(atualizar=false) {
        setResumoIsOpen(false);
        if (atualizar) atualizarLista();
    }

    const [data, setData] = useState();
    async function handleDataUpdate(e) {
        let dataValue;
        if (!e) {
            dataValue = new Date();
            dataValue = `${dataValue.getFullYear()}-${dataValue.getMonth() + 1}-${dataValue.getDate()}`;
        } else {
            dataValue = e.target.value
        }
        await setData(dataValue);
    }
    useEffect(() => {
        handleDataUpdate();
    }, []);

    const [alterarSolicitacaoIsOpen, setAlterarSolicitacaoIsOpen] = useState(false);
    function openAlterarSolicitacao() {
        setAlterarSolicitacaoIsOpen(true)
    }
    function closeAlterarSolicitacao(atualizar=false) {
        setAlterarSolicitacaoIsOpen(false)
        if(atualizar) atualizarLista()
    }

    const [filtros, setFiltros] = useState(['P', 'F', 'C']);

    async function acessarListaSolicitacao() {
        setIsLoading(true);
        try {
            console.log(data)
            const res = await getListaSolicitacao(data);
            const resData = res.data;
            console.log(resData)
            await setListaSolicitacoes(_.cloneDeep(resData));
        }
        catch (e) {
            console.log(e)
        }
        setIsLoading(false);
    }

    function atualizarLista() {
        acessarListaSolicitacao();
    }

    useEffect(() => {
        acessarListaSolicitacao()
    }, [data]);

    function loadResumo() {
        if(!selectedSolicitacao) return;
        return (
            <>
                <ResumoSolicitacao
                    isOpen={resumoIsOpen}
                    closeModal={closeResumo}
                    solicitacao={selectedSolicitacao}
                    openAlterarSolicitacao={openAlterarSolicitacao}
                />
                <AlterarSolicitacao
                    isOpen={alterarSolicitacaoIsOpen}
                    closeModal={closeAlterarSolicitacao}
                    solicitacao={selectedSolicitacao}
                />
            </>
        )
    }

    function handleFiltroChange(e, value) {
        const isChecked = e.target.checked
        const newFiltros = [...filtros]
        if (isChecked) {
            newFiltros.push(value[0])
        } else {
            const indexFiltro = newFiltros.findIndex(f => f === value[0])
            console.log(indexFiltro)
            newFiltros.splice(indexFiltro, 1);
        }

        setFiltros(newFiltros)
    }

    const listaSolicitacoesFiltradas = listaSolicitacoes.filter(sol =>{
        return filtros.includes(sol.status[0]); 
    })

    const [isLoading, setIsLoading] = useState(false);

    return (
        <div>

            <Header />

            <main>
                <div className={style.flexColumnWrapper}>
                    <Legendas />
                    <Button onClick={openSolicitacao}>Nova Solicitação</Button>
                </div>

                <div className={style.flexColumnWrapper}>
                    <div className={style.dataSelector}>
                        <InputDate value={data} onChange={handleDataUpdate} className={style.dataFilter} label="Data:" />
                        {isLoading ? <Spinner className={style.spin} size={'medium'} /> : ''}
                    </div>

                    <div className={style.filtros}>
                        <InputCheckbox onChange={handleFiltroChange} value={filtros.includes('P')} label="Pendentes" name="P"/>
                        <InputCheckbox onChange={handleFiltroChange} value={filtros.includes('F')} label="Finalizados" name="F"/>
                        <InputCheckbox onChange={handleFiltroChange} value={filtros.includes('C')} label="Cancelados" name="C"/>
                    </div>
                </div>

                <SolicitacaoRail
                    listaSolicitacoes={listaSolicitacoesFiltradas}
                    openResumo={openResumo}
                />
            </main>

            <IncluirSolicitacaoModal
                isOpen={solicitacaoIsOpen}
                closeModal={closeSolicitacao}
            />

            {loadResumo()}
            

        </div>
    );
}

export default AgendasDia;

