import style from "./SearchList.module.scss";

function SearchList({users, setBusca}) {
    return (
        <ul className={style.searchList}>
            {users.map((user, index) => (
                <li
                    key={index} 
                    className={style.searchItem}
                    onClick={() => setBusca(user.nome)}
                >
                    <span className={style.nome}>{user.nome}</span>
                    <div className={style.cpf}>{user.cpf}</div>
                </li>
            ))}
        </ul>
    );
}

export default SearchList;