import { PulseLoader } from "react-spinners";

interface Props {
    row?: boolean;
}

export const Loader = ({ row }: Props) => {
    return (
        <>
            {row && <div />}
            <div className="spin-loader">
                <PulseLoader color="#5F9F9C" />
            </div>
        </>
    );
};