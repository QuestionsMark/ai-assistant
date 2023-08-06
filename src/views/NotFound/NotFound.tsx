import { ContentWrapper } from "../../components/layout/ContentWrapper";
import { Main } from "../../components/layout/Main";

export const NotFound = () => {
    return (
        <ContentWrapper>
            <Main className="not-found">
                Error 404!
            </Main>
        </ContentWrapper>
    );
};