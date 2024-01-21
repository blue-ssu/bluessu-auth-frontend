import { CenterBox, Flex, Spinner } from "../../components";
import { Logo } from "../../components/Logo/Logo";

import BlueSSULogo from "../../assets/bluessu.png";
import styled from "styled-components";
import { Select } from "../../components/Select";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "react-query";
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

const postSSO = async (sToken: string) => {
    const res = await axios.post(
        `${import.meta.env.VITE_CORE_SERVER}/auth/sso`,
        {
            sToken,
        }
    );
    return res.data;
};

export const SSOPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation(
        (sToken: string) => postSSO(sToken),
        {
            onSuccess: (data) => {
                localStorage.setItem("token", data.token);
                navigate("/");
            },
            onError: (err) => {
                console.log(err);
            },
        }
    );

    useEffect(() => {
        const sToken = searchParams.get("sToken");
        if (!sToken) {
            navigate("/signin");
            return;
        }

        if (!isLoading) {
            mutate(sToken);
        }
    }, [navigate, searchParams, mutate, isLoading]);

    return (
        <CenterBox minHeight="320px">
            <CenterBox.Header>
                <Logo src={BlueSSULogo} size="20px" />
                BlueSSU 로그인
            </CenterBox.Header>
            <CenterBox.Body>
                <CenterBox.Title
                    icon={<Spinner color="var(--bluessu-primary)" size={64} />}
                    title="잠시만 기다려주세요"
                    subtitle="로그인을 진행하고 있어요"
                />
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
