import { Widget, toggleMsgLoader, addResponseMessage } from "react-chat-widget";
import { OpenAIChat } from "../../lib/open-ai-chat";
import { useState } from "react";
import { handleCallableFunction } from "../../lib/callable-functions";
import { ChatCompletionRequestMessageRoleEnum } from "openai";

interface Props {
    system: string;
}

export const ChatBot = ({ system }: Props) => {
    const [chat] = useState(new OpenAIChat(system));
    const handleNewUserMessage = async (message: string, role: ChatCompletionRequestMessageRoleEnum = ChatCompletionRequestMessageRoleEnum.User, functionName?: string) => {
        toggleMsgLoader();
        try {
            const res = await chat.say(message, role, functionName);

            if (res?.functionCall) {
                handleNewUserMessage(handleCallableFunction(res.functionCall), ChatCompletionRequestMessageRoleEnum.Function, res.functionCall.name);
            }

            if (res?.content) {
                addResponseMessage(res?.content);
            }
        } finally {
            toggleMsgLoader();
        }
    };

    return (
        <Widget
            handleNewUserMessage={handleNewUserMessage}
        />
    );
};