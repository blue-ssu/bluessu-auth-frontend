import { styled } from "styled-components";

const Container = styled.div`
    margin-top: 8px;
`;

export const CenterBoxFooter = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return <Container>{children}</Container>;
};
