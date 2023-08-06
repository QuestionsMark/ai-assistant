import { CreateChatCompletionRequest, CreateChatCompletionResponse, OpenAIApi, Configuration, ChatCompletionRequestMessage, ChatCompletionRequestMessageFunctionCall, ChatCompletionRequestMessageRoleEnum } from "openai";
import { GetInformationKind } from "./callable-functions";
import { OPENAI_API_KEY } from "../../config/config";

export type ChatResponse = null | {
    content: null | string;
    functionCall: null | ChatCompletionRequestMessageFunctionCall;
};

const parameters: CreateChatCompletionRequest = {
    n: 1,
    top_p: 0.5,
    temperature: 1,
    stream: false,
    model: 'gpt-3.5-turbo-16k-0613',
    messages: [],
    functions: [
        {
            name: 'getInformationAboutBoss',
            description: "Get information about secretary boss.",
            parameters: {
                type: 'object',
                properties: {
                    kind: {
                        type: 'string',
                        description: 'Type of information to get.',
                        enum: [GetInformationKind.Availability, GetInformationKind.Schedule],
                    },
                },
            },
        }
    ],
};

const openAIConfig = {
    apiKey: OPENAI_API_KEY,
    parameters,
}

const extractFirstChoice = (data: CreateChatCompletionResponse): ChatResponse => {
    const firstChoice = data?.choices?.[0].message;

    if (!firstChoice) return null;

    return {
        content: firstChoice?.content ?? null,
        functionCall: firstChoice.function_call ?? null,
    };
};

export class OpenAIChat {
    private readonly openai: OpenAIApi;
    private readonly messages: ChatCompletionRequestMessage[];

    constructor(system: string) {
        this.messages = [
            {
                role: 'system',
                content: system,
            },
        ];
        this.openai = new OpenAIApi(new Configuration({
            apiKey: openAIConfig.apiKey,
        }));
    }

    async say(prompt: string, role: ChatCompletionRequestMessageRoleEnum = ChatCompletionRequestMessageRoleEnum.User, functionName?: string): Promise<ChatResponse> {
        this.messages.push({
            role,
            content: prompt,
            name: functionName,
        });

        const { data } = await this.openai.createChatCompletion({
            ...openAIConfig.parameters,
            messages: this.messages,
        });

        const response = extractFirstChoice(data);

        if (response?.content) {
            this.messages.push({
                role: 'assistant',
                content: response.content,
            });
        }

        return response;
    }
}