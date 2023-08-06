// import { Image } from "../common/Image";
// import logo from '../../assets/logo.png';

interface Props {
    className?: string;
}

export const Logo = ({ className }: Props) => {
    return (
        <div className={`logo${className ? ' ' + className : ''}`}>
            {/* <Image alt="logo" src={logo} isStatic className="img--natural" /> */}
        </div>
    );
};