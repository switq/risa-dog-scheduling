import style from './Footer.module.scss'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { LogoutIcon } from '../../assets/icons/logoutIcon';
import logo from '../../assets/img/risadog-logo-white-300x130.png'


function Footer() {
    const { signout } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        signout();
        navigate("/");
    }

    return (
        <footer className={style.headerContainer}>
            <div  className={style.row}>
                <span className={style.logoWrapper}><img className={style.logo} src={logo} alt="risa dog logo" /></span>
            </div>
        </footer>
    );
}

export default Footer;