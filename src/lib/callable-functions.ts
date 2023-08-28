import { ChatCompletionRequestMessageFunctionCall } from "openai";
import { fetchTool } from "../utils/api.util";
import { Item } from "../types";

export enum CallableFunction {
    GetInformation = 'getInformationAboutItems',
    AddItemDoDeposit = 'addItemToDeposit',
    ChangeItemStatusToFinished = 'changeItemStatusToFinished',
    RemoveItemFromDeposit = 'removeItemFromDeposit',
    RemoveManyItemsFromDeposit = 'removeManyItemsFromDeposit',
}

export enum GetInformationKind {
    ItemsCount = 'itemsCount',
    ItemsList = 'itemsList',
}

export interface GetInformationProperties {
    kind: GetInformationKind;
    itemName?: string;
}

const getInformation = async ({ kind }: GetInformationProperties): Promise<string> => {
    console.log({ kind });
    switch (kind) {
        case GetInformationKind.ItemsList: {
            const response = await fetchTool<Item.Response[]>('assistant/item');

            if (!response.status) throw new Error(response.message);

            return JSON.stringify(response.results);
        }

        case GetInformationKind.ItemsCount: {
            const response = await fetchTool<number>('assistant/item/count');

            if (!response.status) throw new Error(response.message);

            return JSON.stringify(response.results);
        }

        default:
            throw new Error('Unknown kind of information.');
    }
};

export interface AddItemToDepositProperties {
    itemName: string;
}

const addItemToDeposit = async ({ itemName }: AddItemToDepositProperties) => {
    console.log('Add', { itemName });
    const response = await fetchTool<string>('assistant/item', 'POST', { name: itemName });

    if (!response.status) throw new Error(response.message);

    return response.results;
};

export interface ChangeItemStatusToFinishedProperties {
    itemName: string;
}

const changeItemStatusToFinished = async ({ itemName }: ChangeItemStatusToFinishedProperties) => {
    console.log('Change status', { itemName });
    const response = await fetchTool<string>(`assistant/item/finish/${itemName}`, 'PATCH');

    if (!response.status) throw new Error(response.message);

    return response.results;
};

export interface RemoveItemFromDepositProperties {
    itemName: string;
}

const removeItemFromDeposit = async ({ itemName }: RemoveItemFromDepositProperties) => {
    console.log('Remove', { itemName });
    const response = await fetchTool<string>(`assistant/item/${itemName}`, 'DELETE');

    if (!response.status) throw new Error(response.message);

    return response.results;
};

export interface RemoveManyItemsFromDepositProperties {
    itemsNames: string;
}

const removeManyItemsFromDeposit = async ({ itemsNames }: RemoveManyItemsFromDepositProperties) => {
    console.log('Remove many', { itemsNames });
    const response = await fetchTool<string>(`assistant/items/${itemsNames}`, 'DELETE');

    if (!response.status) throw new Error(response.message);

    return response.results;
};

export const handleCallableFunction = async (call: ChatCompletionRequestMessageFunctionCall): Promise<string> => {
    try {
        switch (call.name) {
            case CallableFunction.GetInformation:
                return getInformation(JSON.parse(call.arguments ?? 'null') as GetInformationProperties);

            case CallableFunction.AddItemDoDeposit:
                return addItemToDeposit(JSON.parse(call.arguments ?? 'null') as AddItemToDepositProperties);

            case CallableFunction.ChangeItemStatusToFinished:
                return changeItemStatusToFinished(JSON.parse(call.arguments ?? 'null') as ChangeItemStatusToFinishedProperties);

            case CallableFunction.RemoveItemFromDeposit:
                return removeItemFromDeposit(JSON.parse(call.arguments ?? 'null') as RemoveItemFromDepositProperties);

            case CallableFunction.RemoveManyItemsFromDeposit:
                return removeManyItemsFromDeposit(JSON.parse(call.arguments ?? 'null') as RemoveManyItemsFromDepositProperties);

            default:
                throw new Error('Unknown function name.');
        }
    } catch (e) {
        return (e as Error).message;
    }
}