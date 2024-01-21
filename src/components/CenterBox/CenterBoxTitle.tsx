import React from "react";
import { styled } from "styled-components";
import { Flex } from "..";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 32px;
    gap: 8px;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    line-height: 1.5;
    color: var(--bluessu-text);
`;

const Subtitle = styled.div`
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    color: var(--bluessu-caption);
`;

export const CenterBoxTitle = ({
    icon,
    title,
    subtitle,
}: {
    icon: React.ReactNode;
    title: React.ReactNode;
    subtitle: React.ReactNode;
}) => {
    return (
        <Container>
            {icon}
            <Flex direction="column" align="center">
                <Title>{title}</Title>
                <Subtitle>{subtitle}</Subtitle>
            </Flex>
        </Container>
    );
};
