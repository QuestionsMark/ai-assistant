import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

type FileType = 'image' | 'audio';

export const useFileDrop = (defalutValue: string, fileType: FileType, multiple: boolean, customClassName: string | null = null) => {

    const [value, setValue] = useState(defalutValue);
    const [files, setFiles] = useState<File[] | null>(null);

    const getCorrectFormat = () => {
        switch (fileType) {
            case 'image':
                return 'image/*';
            case 'audio':
                return 'audio/*';
        }
    };

    const resetValue = () => {
        setValue(defalutValue);
    };

    const validation = (type: string) => {
        if (fileType === 'image') {
            if (type.indexOf('image/') !== -1) {
                setValue('Looks good.');
            } else if (!type) {
                setValue("Let's see...");
            } else {
                setValue('Wrong file format.');
            }
        } else if (fileType === 'audio') {
            if (type.indexOf('audio/') !== -1) {
                setValue('Looks good.');
            } else if (!type) {
                setValue("Let's see...");
            } else {
                setValue('Wrong file format.');
            }
        }
        return null;
    };

    const {
        getRootProps,
        getInputProps,
        acceptedFiles,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: {
            [getCorrectFormat()]: [],
        },
        multiple,
        validator: (file) => validation(file.type),
    });

    const className = useMemo(() => {
        const classNames = customClassName ? [customClassName, 'filedrop'] : ['filedrop'];
        if (isFocused) {
            classNames.push('filedrop--focus');
        }
        if (isDragAccept) {
            classNames.push('filedrop--accept');
        }
        if (isDragReject) {
            classNames.push('filedrop--reject');
        }
        return classNames.join(' ');
    }, [
        isFocused,
        isDragAccept,
        isDragReject,
    ]);

    useEffect(() => {
        setFiles(acceptedFiles);
    }, [acceptedFiles]);

    return { className, files, value, getInputProps, getRootProps, resetValue };
};