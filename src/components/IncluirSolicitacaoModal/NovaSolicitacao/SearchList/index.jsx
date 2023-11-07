import style from "./SearchList.module.scss";

function SearchList({users, setCliente}) {
    return (
        <ul className={style.searchList}>
            {users.map((user, index) => (
                <li
                    key={index} 
                    className={style.searchItem}
                    onClick={() => setCliente(user)}
                >
                    <span className={style.nome}>{user.nome}</span>
                    <div className={style.cpf}>{user.cpf}</div>
                </li>
            ))}
        </ul>
    );
}

export default SearchList;