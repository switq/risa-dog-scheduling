import style from './Tabela.module.scss'
import ItemTabela from './ItemTabela';
import { useState } from 'react';
import Horarios from '../Horarios'

function Tabela({ 
    solicitacao, 
    setSolicitacao, 
    colaboradores,
    servicos,

}) {

    

    return (
        <table className={style.tabela}>
            <tr>
                <th className={style.servicosTh}>Serviço</th>
                <th className={style.execucaoTh}>Execução</th>
                <th className={style.horaTh}>Hora</th>
                <th className={style.precoTh}>Preço</th>
                <th className={style.adicionalTh}>Adicional</th>
                <th className={style.totalTh}>Total</th>
            </tr>

            {solicitacao.execucoes.map((execucao) => (
                <ItemTabela
                    execucao={execucao}
                    solicitacao={solicitacao}
                    setSolicitacao={setSolicitacao}
                    colaboradores={colaboradores}
                    servicos={servicos}
                />
            ))}
        </table>
    );
}

export default Tabela;