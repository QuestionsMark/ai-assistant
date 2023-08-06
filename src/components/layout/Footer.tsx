// import { Image } from "../common/Image";

import { Paragraph } from "../common/Paragraph";

// import brandLogo from '../../assets/brand_logo.png';

export const Footer = () => {
    return (
        <footer className="footer">
            {/* <Image alt="brand logo" src={brandLogo} className="img--natural footer__brand-logo" isStatic /> */}
            <Paragraph className="footer__text">© Copyright 2023. All rights reserved.</Paragraph>
        </footer>
    );
};