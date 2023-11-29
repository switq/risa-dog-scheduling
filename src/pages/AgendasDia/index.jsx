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
    function closeAlterarSolicitacao() {
        setAlterarSolicitacaoIsOpen(false)
    }


    async function acessarListaSolicitacao() {
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
                    solicitacao={solicitacao}
                />
            </>
        )
    }

    return (
        <div>

            <Header />

            <main>
                <div className={style.flexColumnWrapper}>
                    <Legendas />
                    <Button onClick={openSolicitacao}>Nova Solicitação</Button>
                </div>

                <div className={style.flexColumnWrapper}>
                    <InputDate value={data} onChange={handleDataUpdate} className={style.dataFilter} label="Data:" />

                    <div className={style.filtros}>
                        <InputCheckbox label="Pendentes" />
                        <InputCheckbox label="Finalizados" />
                        <InputCheckbox label="Cancelados" />
                    </div>
                </div>

                <SolicitacaoRail
                    listaSolicitacoes={listaSolicitacoes}
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

