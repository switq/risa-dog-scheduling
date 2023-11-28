import { createContext, useEffect, useState } from "react";
import { loginPost } from "../connection/Autenticacao";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");

        if (!!userToken) {
            const hasUser = JSON.parse(userToken).usuario;

            if (!!hasUser) setUser(hasUser)
        }
    }, [])

    const signin = async (email, password) => {
        try {
            const res = await loginPost({email: email, senha: password});
            const {usuario, token} = res.data;

            localStorage.setItem("user_token", JSON.stringify({usuario, token}))
            setUser(usuario);
            
            return;

        } catch (error) {
            const errorMessage = JSON.parse(error.request.response).error
            return errorMessage;
        }
    }

    const signout = () => {
        setUser(null);
        localStorage.removeItem("user_token");
    }

    return (
        <AuthContext.Provider
            value={{ user, signed: !!user, signin, signout}}
        >
            {children}
        </AuthContext.Provider>
    )
}