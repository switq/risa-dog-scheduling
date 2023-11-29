import style from './Header.module.scss'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { LogoutIcon } from '../../assets/icons/logoutIcon';
import logo from '../../assets/img/risadog-logo-white-300x130.png'


function Header() {
    const { signout } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        signout();
        navigate("/");
    }

    return (
        <header className={style.headerContainer}>
            <div className={style.row}>
                <span className={style.logoWrapper}><img className={style.logo} src={logo} alt="risa dog logo" /></span>
                <h1>Agendas do dia</h1>

            </div>
            <span className={style.logout} onClick={handleSignOut}><LogoutIcon /></span>
        </header>
    );
}

export default Header;