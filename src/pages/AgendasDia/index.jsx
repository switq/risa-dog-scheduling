import Header from "../../components/Header";
import Legendas from "./Legendas";
import { Button } from "../../components/common/Button.style";
import style from "./AgendasDia.module.scss";
import { InputDate } from "../../components/common/Inputs/InputDate";
import { InputCheckbox } from "../../components/common/Inputs/InputCheckbox";
import SolicitacaoCard from "../../components/SolicitacaoRail/SolicitacaoCard";


function AgendasDia() {
    return (
        <div>
            <Header />
            <div>
                <div className={style.flexColumnWrapper}>
                    <Legendas />
                    <Button>Nova Solicitação</Button>
                </div>
                <div className={style.flexColumnWrapper}>
                    <InputDate className={style.dataFilter} label="Data:" />
                    <div className={style.filtros}>
                        <InputCheckbox label="Pendentes"/>
                        <InputCheckbox label="Finalizados"/>
                        <InputCheckbox label="Cancelados"/>
                    </div>
                </div>
                <div>
                    <SolicitacaoCard />
                </div>
            </div>
        </div>
    );
}

export default AgendasDia;