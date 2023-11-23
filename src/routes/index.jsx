import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AgendasDia from "../pages/AgendasDia";
import Login from "../pages/Login";

const Private = ({ Item }) => {
    const signed = false;

    return signed > 0 ? <Item /> : <Login />;
}

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route path="/agendas" element={<Private Item={AgendasDia} />} />
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route path="*" element={<Login />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
};

export default RoutesApp;