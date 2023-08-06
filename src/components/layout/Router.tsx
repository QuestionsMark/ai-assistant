import { Routes, Route } from "react-router-dom";
import { Home } from "../../views/Home/Home";
import { NotFound } from "../../views/NotFound/NotFound";
import { Login } from "../../views/Login/Login";
import { Register } from "../../views/Register/Register";

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};