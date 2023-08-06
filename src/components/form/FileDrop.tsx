import { forwardRef, useEffect } from "react";
import { useFileDrop } from "../../hooks/useFileDrop";

type FileType = 'image' | 'audio';

interface Props {
    defaultValue: string;
    fileType: FileType;
    multiple?: boolean;
    customClassName?: string;
    handler: (files: File[] | null) => void;
}

export const FileDrop = forwardRef<HTMLInputElement, Props>(({ customClassName, defaultValue, fileType, multiple = false, handler }, ref) => {

    const { className, files, value, getInputProps, getRootProps, resetValue } = useFileDrop(defaultValue, fileType, multiple, customClassName);

    useEffect(() => {
        if (!files) return;
        handler(files);
        resetValue();
    }, [files]);

    return (
        <div {...getRootProps({ className, onDragLeave: resetValue })}>
            <input {...getInputProps()} ref={ref} />
            {value}
        </div>
    );
});