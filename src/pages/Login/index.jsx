import style from "./Login.module.scss"
import logo from "../../assets/img/risadog-logo.png"
import { Button } from "../../components/common/Button.style"
import { useState } from "react";

function initialState() {
    return { email: '', password: '', }
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
                            onChange={onchange}
                            id="email"
                            type="email"
                            placeholder="E-mail"
                            required
                        />
                        <i className="bx bxs-user"></i>
                    </div>
                    <div className={style.inputBox}>
                        <input 
                            values={values.password} 
                            onChange={onchange} 
                            id="password" 
                            type="password" 
                            placeholder="Senha" 
                            required />
                        <i className="bx bxs-lock-alt"></i>
                    </div>
                    <Button className={style.btn} type="submit">Fazer login</Button>
                </form>
            </div>
        </div>
    )
}

export default Login