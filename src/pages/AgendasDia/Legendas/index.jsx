import style from './Legendas.module.scss'

function Legendas() {
    const legendas = [
        { text: 'Pendente', color: 'var(--magenta)' },
        { text: 'Terminado', color: 'var(--verde)' },
        { text: 'Cancelado', color: 'var(--vermelho)' },
    ]
    return (
        <ul className={style.legendasContainer}>
            <li className={style.legenda}>Legendas: </li>
            {legendas.map(({text, color}, index) => (
                <li className={style.legenda}> <span className={style.quadradinho} style={{backgroundColor: color}}/>{text}</li>
            ))}
        </ul>
    );
}

export default Legendas;