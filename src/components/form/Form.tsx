import { FormEvent, ReactNode } from "react";
import { ZodSchema } from "zod";
import { usePromises } from "../../contexts/promises.context";
import { ClientResponseError, ClientResponseOK, Method } from "../../types";
import { fetchTool, fetchWithFileUpload, minimalDelayFunction } from "../../utils/api.util";
import { checkValidation } from "../../validation/common";

interface Props {
    children: ReactNode;
    form: any;
    options: {
        path: string;
        method?: Method;
        body?: any;
        withFiles?: boolean;
    };
    validationSchema: ZodSchema;
    className?: string;
    onError?: (response: ClientResponseError) => void;
    onSuccess?: (response: ClientResponseOK<any>) => void;
}

export const Form = ({ children, form, options, onError, onSuccess, validationSchema, className }: Props) => {
    const { path, body, method, withFiles } = options;

    const { setError, setLoading } = usePromises();

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const errors = checkValidation(form, validationSchema);
        if (errors) return setError(Object.values(errors).map(v => v.error));

        setLoading(true);
        let formData: FormData;
        if (withFiles) {
            const data = new FormData();
            if (body.images) {
                for (const img of body.images as File[]) {
                    data.append('image', img);
                }
            }
            data.append('data', JSON.stringify((({ images, ...o }) => o)({ ...body })));
            formData = data;
        }
        const { delayTime, response } = withFiles ?
            await minimalDelayFunction(() => fetchWithFileUpload(path, method, formData)) :
            await minimalDelayFunction(() => fetchTool(path, method, body));

        setTimeout(() => {
            setLoading(false);
            setTimeout(() => {
                return !response.status ?
                    (typeof onError === 'function' ? onError((response)) : undefined) :
                    (typeof onSuccess === 'function' ? onSuccess(response) : undefined);
            });
        }, delayTime);
    };

    return (
        <form className={`form${className ? ' ' + className : ''}`} onSubmit={onSubmit}>
            {children}
        </form>
    );
};