import { styled } from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0px 16px;
    border: 1px solid var(--bluessu-border);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    color: var(--bluessu-caption);
    font-size: 14px;
    gap: 8px;

    @media (max-width: 768px) {
        border: 0;
        border-bottom: 1px solid var(--bluessu-border);
    }
`;

export const CenterBoxHeader = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return <Container>{children}</Container>;
};
