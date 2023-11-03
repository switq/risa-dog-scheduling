import style from './Tabela.module.scss'

function Tabela() {
    return ( 
        <table className={style.tabela}>
            <tr>
                <th className={style.upDownTh}></th>
                <th className={style.servicosTh}>Serviço</th>
                <th className={style.execucaoTh}>Execução</th>
                <th className={style.horaTh}>Hora</th>
                <th className={style.precoTh}>Preço</th>
                <th className={style.adicionalTh}>Adicional</th>
                <th className={style.totalTh}>Total</th>
            </tr>
            <tr>
                <td></td>
                <td>Banho</td>
                <td>Diogo G.</td>
                <td>14:00</td>
                <td>50,00</td>
                <td>R$ 20.00</td>
                <td>R$ 70.00</td>
            </tr>
            <tr>
                <td></td>
                <td>Banho</td>
                <td>Diogo G.</td>
                <td>14:00</td>
                <td>50,00</td>
                <td>R$ 20.00</td>
                <td>R$ 70.00</td>
            </tr>
        </table>
     );
}

export default Tabela;