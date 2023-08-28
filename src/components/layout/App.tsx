import { ToastContainer } from "react-toastify"
import { ChatBot } from "../common/ChatBot"
import { useScrollUp } from "../../hooks/useScrollUp"
import { Header } from "./Header";
import { Router } from "./Router";

export const App = () => {
    useScrollUp();

    return (
        <div className="app">
            <Header />
            <Router />
            <ToastContainer
                theme={'dark'}
                progressStyle={{ background: '#4df54d' }}
                position="top-right"
            />
        </div>
    )
}
