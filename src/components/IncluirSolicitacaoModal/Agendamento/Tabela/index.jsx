import style from './Tabela.module.scss'
import ItemTabela from './ItemTabela';
import { useState } from 'react';
import Horarios from '../Horarios'

function Tabela({ solicitacao, setSolicitacao, colaboradores, setColaboradores, ...props }) {

    


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
                    solicitacao={solicitacao}
                    execucao={execucao}
                    colaboradores={colaboradores}
                />
            ))}

            {/* <tr>
                <td>Banho</td>
                <td>Diogo G.</td>
                <td>14:00</td>
                <td>50,00</td>
                <td>R$ 20.00</td>
                <td>R$ 70.00</td>
            </tr> */}
        </table>
    );
}

export default Tabela;