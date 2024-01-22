import { CenterBox, Flex, SSOLoginButton, Spinner } from "../../components";
import { Logo } from "../../components/Logo/Logo";

import BlueSSULogo from "../../assets/bluessu.png";
import styled from "styled-components";
import { Select } from "../../components/Select";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

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

const ButtonBox = styled.div`
    width: 100%;
    padding: 16px 32px;
`;

const getUser = async () => {
    const res = await axios.get(
        `${import.meta.env.VITE_CORE_SERVER}/users/me`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
};

export const MainPage = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useQuery("user", getUser, {
        enabled: localStorage.getItem("token") !== null,
        onError: () => {
            localStorage.removeItem("token");
            navigate("/signin");
        },
    });

    useEffect(() => {
        if (sessionStorage.getItem("redirectUrl")) {
            navigate("/signin/redirect");
            return;
        }
    }, [navigate]);

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/signin");
            return;
        }
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <CenterBox minHeight="320px">
            <CenterBox.Header>
                <Logo src={BlueSSULogo} size="20px" />
                BlueSSU 로그인
            </CenterBox.Header>
            <CenterBox.Body>
                {isLoading ? (
                    <CenterBox.Title
                        icon={
                            <Spinner color="var(--bluessu-primary)" size={64} />
                        }
                        title="잠시만 기다려주세요"
                        subtitle="로그인을 진행하고 있어요"
                    />
                ) : (
                    <CenterBox.Title
                        icon={<Logo src={data?.profileImage} size="64px" />}
                        title={`${data?.name}님, 반가워요!`}
                        subtitle={`${data?.department} ${data?.studentId}`}
                    />
                )}
                <CenterBox.Description>
                    이 페이지는 개발 중인 페이지입니다.
                </CenterBox.Description>
                <ButtonBox>
                    <SSOLoginButton onClick={() => logout()}>
                        로그아웃
                    </SSOLoginButton>
                </ButtonBox>
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
