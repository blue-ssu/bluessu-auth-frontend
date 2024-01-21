import { styled } from "styled-components";

const Outer = styled.div`
    display: flex;
    width: 100dvw;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const Container = styled.div<{ $maxWidth: string; $minHeight: string }>`
    display: flex;
    flex-direction: column;
    max-width: ${({ $maxWidth }) => $maxWidth};
    min-height: ${({ $minHeight }) => $minHeight};
    width: 100%;
    position: relative;

    height: auto;
    @media (max-width: 768px) {
        height: 100%;
    }
`;

export const CenterBoxComponent = ({
    children,
    maxWidth = "420px",
    minHeight = "540px",
}: {
    children: React.ReactNode;
    maxWidth?: string;
    minHeight?: string;
}) => {
    return (
        <Outer>
            <Container $maxWidth={maxWidth} $minHeight={minHeight}>
                {children}
            </Container>
        </Outer>
    );
};
