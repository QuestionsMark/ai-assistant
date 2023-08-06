import { ChatCompletionRequestMessageFunctionCall } from "openai";

export enum CallableFunction {
    GetInformation = 'getInformationAboutBoss',
}

export enum GetInformationKind {
    Availability = 'availability',
    Schedule = 'schedule',
}

export interface GetInformationProperties {
    kind: GetInformationKind;
}

const getInformation = ({ kind }: GetInformationProperties): string => {
    switch (kind) {
        case GetInformationKind.Availability:
            return 'Boss is available now.';
        case GetInformationKind.Schedule:
            return `{
                "monday": [
                    {
                        "hours": "10:00-13:00",
                        "description": "Breakfast with family"
                    },
                    {
                        "hours": "15:00-17:00",
                        "description": "Training on swimming pool."
                    }
                ],
                "tuesday": [
                    {
                        "hours": "10:00-19:00",
                        "description": "work"
                    }
                ],
                "wednesday": [
                    {
                        "hours": "10:00-13:00",
                        "description": "Breakfast with family"
                    }
                ],
                "thursday": [
                    {
                        "hours": "10:00-13:00",
                        "description": "Breakfast with family"
                    }
                ],
                "friday": [
                    {
                        "hours": "15:00-17:00",
                        "description": "Training on swimming pool."
                    }
                ],
                "saturday": [],
                "sunday": []
            }`
        default:
            throw new Error('Unknown kind of information.');
    }
};

export const handleCallableFunction = (call: ChatCompletionRequestMessageFunctionCall): string => {
    try {
        switch (call.name) {
            case CallableFunction.GetInformation:
                return getInformation(JSON.parse(call.arguments ?? 'null') as GetInformationProperties);

            default:
                throw new Error('Unknown function name.');
        }
    } catch (e) {
        return (e as Error).message;
    }
}