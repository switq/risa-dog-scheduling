import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AgendasDia from "../pages/AgendasDia";
import Login from "../pages/Login";
import useAuth from "../hooks/useAuth";

const Private = ({ Item }) => {
    const {signed} = useAuth();

    return signed > 0 ? <Item /> : <Login />;
}

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route exact path="/agendas" element={<Private Item={AgendasDia} />} />
                    <Route path="/" element={<Private Item={AgendasDia} />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route path="*" element={<Login />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
};

export default RoutesApp;