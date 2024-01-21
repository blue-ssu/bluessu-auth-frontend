import { CenterBox, Flex, SSOLoginButton } from "../../components";
import { Logo } from "../../components/Logo/Logo";

import BlueSSULogo from "../../assets/bluessu.png";
import styled from "styled-components";
import { Select } from "../../components/Select";

const ButtonBox = styled.div`
    width: 100%;
    padding: 16px 32px;
`;

const Link = styled.a`
    color: var(--bluessu-caption);
    text-decoration: none;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    transition: color 0.1s;

    &:hover {
        color: var(--bluessu-text);
    }
`;

export const SignInPage = () => {
    const buttonClick = () => {
        window.location.href = `https://smartid.ssu.ac.kr/Symtra_sso/smln.asp?apiReturnUrl=${window.location.protocol}//${window.location.host}/signin/sso`;
    };

    return (
        <CenterBox>
            <CenterBox.Header>
                <Logo src={BlueSSULogo} size="20px" />
                BlueSSU 로그인
            </CenterBox.Header>
            <CenterBox.Body>
                <CenterBox.Title
                    icon={<Logo src={BlueSSULogo} size="64px" />}
                    title="로그인"
                    subtitle="BlueSSU에 로그인해요"
                />
                <ButtonBox>
                    <SSOLoginButton onClick={() => buttonClick()}>
                        SmartID (SSO)로 계속하기
                    </SSOLoginButton>
                </ButtonBox>

                <CenterBox.Description>
                    BlueSSU는 숭실대학교를 위한 Open API 프로젝트입니다. 계속
                    진행하면 BlueSSU의 개인정보 처리방침과 서비스 약관에
                    동의하는 것으로 간주해요.
                </CenterBox.Description>
            </CenterBox.Body>
            <CenterBox.Footer>
                <Flex.Between>
                    <Select width="150px">
                        <option value="ko">한국어</option>
                    </Select>
                    <Flex.Row gap="16px" style={{ padding: "0px 8px" }}>
                        <Link href="#">소개</Link>
                        <Link href="#">개인정보처리방침</Link>
                        <Link href="#">약관</Link>
                    </Flex.Row>
                </Flex.Between>
            </CenterBox.Footer>
        </CenterBox>
    );
};
