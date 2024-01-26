import { CenterBox, Spinner } from "../../components";

import BlueSSULogo from "../../assets/bluessu.png";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Footer } from "@/containers/Footer/Footer";

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

export const RedirectPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const redirectUrl =
        searchParams.get("redirectUrl") ||
        sessionStorage.getItem("redirectUrl");
    const redirectUrls = JSON.parse(import.meta.env.VITE_REDIRECT_URLS);
    const [message, setMessage] = useState({
        title: "잠시만 기다려주세요",
        subtitle: "로그인을 진행하고 있어요",
    });

    useEffect(() => {
        if (!redirectUrl) {
            setMessage({
                title: "Redirect URL이 없어요",
                subtitle: "개발자에게 문의해주세요.",
            });
            return;
        }

        if (!localStorage.getItem("token") && redirectUrl) {
            sessionStorage.setItem("redirectUrl", redirectUrl);
            navigate("/signin");
            return;
        }
    }, [navigate, redirectUrl]);

    const { isLoading } = useQuery("user", getUser, {
        enabled: !!(localStorage.getItem("token") && redirectUrl),
        onError: () => {
            if (localStorage.getItem("token")) {
                localStorage.removeItem("token");
                navigate("/signin");
                return;
            }
            setMessage({
                title: "로그인에 실패했어요",
                subtitle: "개발자에게 문의해주세요.",
            });
        },
        onSuccess: () => {
            sessionStorage.removeItem("redirectUrl");
            if (!redirectUrl) {
                setMessage({
                    title: "Redirect URL이 없어요",
                    subtitle: "개발자에게 문의해주세요.",
                });
                return;
            }
            if (!(redirectUrls as string[]).includes(redirectUrl)) {
                setMessage({
                    title: "올바르지 않은 Redirect URL이에요",
                    subtitle: "개발자에게 문의해주세요.",
                });
                return;
            }
            window.location.href = `${redirectUrl}?token=${localStorage.getItem(
                "token"
            )}`;
        },
        retry: false,
    });

    return (
        <CenterBox minHeight="320px">
            <CenterBox.Header>
                <img src={BlueSSULogo} className="w-[20px] h-[20px]" />
                BlueSSU 로그인
            </CenterBox.Header>
            <CenterBox.Body>
                {isLoading ? (
                    <CenterBox.Title
                        icon={
                            <Spinner color="var(--bluessu-primary)" size={64} />
                        }
                        title={message.title}
                        subtitle={message.subtitle}
                    />
                ) : (
                    <CenterBox.Title
                        icon={
                            <img
                                src={BlueSSULogo}
                                className="w-[64px] h-[64px]"
                            />
                        }
                        title={message.title}
                        subtitle={message.subtitle}
                    />
                )}
            </CenterBox.Body>
            <CenterBox.Footer>
                <Footer />
            </CenterBox.Footer>
        </CenterBox>
    );
};
