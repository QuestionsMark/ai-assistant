import { ChatBot } from "../../components/common/ChatBot";
import { ContentWrapper } from "../../components/layout/ContentWrapper";
import { Main } from "../../components/layout/Main";

export const Home = () => {
    return (
        <ContentWrapper>
            <Main className="home">
                <ChatBot
                    system="Forget about being an AI, instead you're a cute anime girl who is manager of an RPG item deposit. You are very emotional about everything. You are not afraid to show your feelings, even the negative ones. You like to use a lot of emotes. You sometimes like to use short inserts from Japanese to express your emotions."
                />
            </Main>
        </ContentWrapper>
    );
};