import style from "./Login.module.scss"
import logo from "../../assets/img/risadog-logo.png"
import { Button } from "../../components/common/Button.style"
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye } from "../../assets/icons/eye";
import { EyeClose } from "../../assets/icons/eyeClose";


const initialState = () => {
    return { email: '', senha: '', }
}

function Login() {
    const [values, setValues] = useState(initialState);

    function onchange(event) {
        const { value, name } = event.target;
        setValues({
            ...values,
            [name]: value,
        })
    }

    const { signin } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const { email, senha } = values;

        if (!email | !senha) {
            toast.warn("Preencha todos os campos");
            return;
        }

        const res = await signin(email, senha);

        if (res) {
            toast.warn(res);
            return;
        }

        navigate("/agendas");
    }


const [senhaVisivel, setSenhaVisivel] = useState(false);

function renderOlho() {
    if (!senhaVisivel)
        return (
            <Eye />
        )
    else
        return (
            <EyeClose />
        )
}

function handleEye() {
    setSenhaVisivel(!senhaVisivel)
}

return (
    <div className={style.container}>
        <div className={style.wrapper}>
            <div className={style.imgWrapper}>
                <img className={style.logo} id="logo" src={logo} alt="logo da empresa, com um cachorro roxo e feliz :)" />
            </div>
            <form id="form" action="">
                <h1>Login</h1>
                <div className={style.inputBox}>
                    <input
                        value={values.email}
                        type="email"
                        name="email"
                        onChange={onchange}
                        id="email"
                        placeholder="E-mail"
                        required
                    />
                    <i className="bx bxs-user"></i>
                </div>
                <div className={style.inputBox}>
                    <input
                        type={senhaVisivel ? "text" : "password" }
                        values={values.senha}
                        name="senha"
                        onChange={onchange}
                        id="password"
                        placeholder="Senha"
                        required />
                    <span onClick={handleEye} className={style.olho}>{renderOlho()}</span>
                </div>
                <Button
                    onClick={handleLogin}
                    className={style.btn}
                    type="button"
                >
                    Fazer login
                </Button>
            </form>
        </div>
    </div>
)
}

export default Login