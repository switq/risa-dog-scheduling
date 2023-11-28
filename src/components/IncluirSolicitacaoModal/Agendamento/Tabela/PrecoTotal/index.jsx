import { useEffect, useState } from 'react';
import style from './PrecoTotal.module.scss'

function PrecoTotal({
    solicitacao,
}) {

    const [valor, setValor] = useState(0);

    useEffect(() => {
        let valorBruto = calcularValorTotal();
        const desconto = solicitacao.desconto ? parseFloat(solicitacao.desconto) : 0;

        const valorDescontado = valorBruto - (valorBruto * desconto);
        const valorConvertido = valorDescontado.toFixed(2);
        setValor(valorConvertido)
    }, [solicitacao])

    function calcularValorTotal() {
        const valorSolicitacao = solicitacao.execucoes.reduce((acc, exec) => {
            return acc + parseFloat(exec.total);
        }, 0)

        return valorSolicitacao;
    }

    return ( 
        <div className={style.linha}>
            {valor}
        </div>
    );
}

export default PrecoTotal;