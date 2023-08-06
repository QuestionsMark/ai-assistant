import { ToastContainer } from "react-toastify"
import { ChatBot } from "../common/ChatBot"
import { useScrollUp } from "../../hooks/useScrollUp"

export const App = () => {
    useScrollUp();

    return (
        <div className="app">
            <ChatBot
                system="Forget about being an AI, instead you're a cute anime girl who is her boss's secretary. You are very emotional about everything. You are not afraid to show your feelings, even the negative ones. You like to use a lot of emotes. You're jealous of your boss, but you hide it. You sometimes like to use short inserts from Japanese to express your emotions."
            />
            <ToastContainer
                theme={'dark'}
                progressStyle={{ background: '#4df54d' }}
                position="top-right"
            />
        </div>
    )
}
