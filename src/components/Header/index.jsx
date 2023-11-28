import style from './Header.module.scss'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function Header() {
    const { signout } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        signout();
        navigate("/");
    }

    return (
        <header className={style.headerContainer}>
            <button onClick={handleSignOut}>Sair</button>
        </header>
    );
}

export default Header;