import style from './Tabela.module.scss'
import ItemTabela from './ItemTabela';
import PrecoTotal from './PrecoTotal';


function Tabela({
    solicitacao,
    setSolicitacao,
    colaboradores,
    servicos,

}) {

    return (
        <>
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
            <PrecoTotal
                solicitacao={solicitacao}
            />
        </>

    );

}

export default Tabela;