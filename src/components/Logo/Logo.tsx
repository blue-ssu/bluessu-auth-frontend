import { styled } from "styled-components";

type StyledLogoProps = {
    $size: string;
};

const StyledLogo = styled.img<StyledLogoProps>`
    width: ${({ $size }) => $size};
    height: ${({ $size }) => $size};
    object-fit: contain;
`;

export const Logo = ({ src, size }: { src: string; size: string }) => {
    return <StyledLogo src={src} $size={size} />;
};
