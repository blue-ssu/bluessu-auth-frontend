import { styled } from "styled-components";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 32px;
    gap: 8px;

    font-size: 15px;
    color: var(--bluessu-caption);
    line-height: 1.5;
`;

export const CenterBoxDescription = ({
    children,
}: {
    children?: React.ReactNode;
}) => {
    return <Container>{children}</Container>;
};
