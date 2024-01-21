import { styled } from "styled-components";
import SSULogo from "../../assets/ssu.png";
import React from "react";

const Container = styled.button`
    width: 100%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid var(--bluessu-border);
    color: var(--bluessu-text);
    font-size: 15px;
    transition: background-color 0.1s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;

    background-color: var(--bluessu-background);
    &:hover {
        background-color: var(--bluessu-background-hover);
    }
`;

const Logo = styled.img`
    height: 14px;
`;

export type SSOLoginButtonProps = {
    children?: React.ReactNode;
} & React.ComponentProps<"button">;
export const SSOLoginButton = React.forwardRef<
    HTMLButtonElement,
    SSOLoginButtonProps
>(({ children, ...props }, ref) => {
    return (
        <Container {...props} ref={ref}>
            <Logo src={SSULogo} />
            {children}
        </Container>
    );
});
