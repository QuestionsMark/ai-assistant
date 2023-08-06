import { Image } from "../common/Image";

interface Props {
    file: File;
}

export const ImagesPreviewItem = ({ file }: Props) => {
    return (
        <li className="form__images-preview-item">
            <Image alt="" src={URL.createObjectURL(file)} className="img img--contain form__images-preview-item-img" isStatic />
        </li>
    );
};