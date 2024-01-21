import { CaretDown } from "@phosphor-icons/react";
import { forwardRef } from "react";
import styled from "styled-components";

const Container = styled.div<{ $width: string }>`
    position: relative;
    display: flex;
    align-items: center;
    transition: 100ms;
    border: none;
    background-color: var(--bluessu-background);
    width: ${(props) => props.$width || "100%"};
    height: 36px;

    font-size: 15px;
    color: var(--bluessu-text);
    line-height: 1.5;
    border-radius: 4px;

    &:hover {
        background-color: var(--bluessu-background-hover);
    }

    &:focus-within {
        background-color: var(--bluessu-background-hover);
    }
`;

const StyledSelect = styled.select`
    appearance: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    transition: 200ms;
    cursor: pointer;
    padding: 0px 8px;
    padding-right: 30px;
`;

const StyledSuffix = styled.div`
    position: absolute;
    right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    user-select: none;
    pointer-events: none;
    transition: 200ms;
`;

export type SelectProps = {
    width?: string;
    children?: React.ReactNode;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (props, ref) => {
        const { width = "100%", children, ...rest } = props;

        return (
            <Container $width={width}>
                <StyledSelect ref={ref} {...rest}>
                    {children}
                </StyledSelect>
                <StyledSuffix>
                    <CaretDown />
                </StyledSuffix>
            </Container>
        );
    }
);
