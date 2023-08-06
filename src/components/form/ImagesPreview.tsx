import { List } from "../common/List";
import { ImagesPreviewItem } from "./ImagesPreviewItem";

interface Props {
    files: File[];
}

export const ImagesPreview = ({ files }: Props) => {
    const imagesList = () => {
        return files.map((f, i) => <ImagesPreviewItem key={String(i)} file={f} />);
    };
    return (
        <div className="form__images-preview">
            <List className="form__images-preview-list">
                {imagesList()}
            </List>
        </div>
    );
};