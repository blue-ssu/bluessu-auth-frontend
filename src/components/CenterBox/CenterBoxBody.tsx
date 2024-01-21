import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    padding: 24px 0px;
    border: 1px solid var(--bluessu-border);
    border-top: none;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    @media (max-width: 768px) {
        padding-top: 100px;
        border: 0;
    }
`;

export const CenterBoxBody = ({ children }: { children: React.ReactNode }) => {
    return <Container>{children}</Container>;
};
