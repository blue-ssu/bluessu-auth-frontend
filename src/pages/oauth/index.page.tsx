import { CenterBox, Spinner } from "../../components";

import BlueSSULogo from "../../assets/bluessu.png";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { Footer } from "@/containers/Footer/Footer";
import { useUser } from "@/hooks/useUser";
import { UserCircle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import SSULogo from "../../assets/ssu.png";
import { useSSO } from "@/hooks/useSSO";
import { useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const getProject = async (clientId: string, redirectURL: string) => {
    const res = await axios.get(
        `${import.meta.env.VITE_CORE_SERVER}/oauth/projects/${clientId}`,
        {
            params: {
                redirectURL,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data as {
        project: {
            name: string;
            iconURL: string;
            termsURL: string;
            privacyURL: string;
            oAuthStatus: "Active" | "Inactive";
            isValidateRedirectUrl: boolean;
        };
    };
};

const generateToken = async (clientId: string, redirectURL: string) => {
    const res = await axios.post(
        `${import.meta.env.VITE_CORE_SERVER}/oauth/auth`,
        {
            clientId,
            redirectURL,
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data.code as string;
};

export const OAuthSignInPage = () => {
    const [searchParams] = useSearchParams();
    const { user, isLogin } = useUser({
        requireLogin: false,
    });
    const clientId =
        searchParams.get("client_id") ||
        sessionStorage.getItem("oauthClientId") ||
        "";
    const redirectURL =
        searchParams.get("redirect_url") ||
        sessionStorage.getItem("oauthRedirectURL") ||
        "";

    const { data } = useQuery(
        ["project"],
        () => getProject(clientId, redirectURL),
        {
            enabled: !!(clientId && redirectURL),
            onError: () => {},
        }
    );

    const { mutate, isLoading } = useMutation(
        () => generateToken(clientId, redirectURL),
        {
            onSuccess: (data) => {
                sessionStorage.removeItem("oauthClientId");
                sessionStorage.removeItem("oauthRedirectURL");
                window.location.href = `${redirectURL}?code=${data}`;
            },
        }
    );

    // 비로그인 사용자가 로그인 했을 때
    const sToken = searchParams.get("sToken") || "";
    const { mutate: signInSSO, isLoading: isSSOLoding } = useSSO({
        onSuccess: () => {
            mutate();
        },
    });
    useEffect(() => {
        if (sToken) {
            signInSSO(sToken);
        }
    }, [sToken, signInSSO]);

    const signInAndContinue = () => {
        sessionStorage.setItem("oauthClientId", clientId);
        sessionStorage.setItem("oauthRedirectURL", redirectURL);
        window.location.href = `https://smartid.ssu.ac.kr/Symtra_sso/smln.asp?apiReturnUrl=${window.location.protocol}//${window.location.host}/oauth`;
    };

    if (isSSOLoding || isLoading) {
        return (
            <CenterBox minHeight="fit-content">
                <CenterBox.Header>
                    <img src={BlueSSULogo} className="w-[20px] h-[20px]" />
                    BlueSSU 로그인
                </CenterBox.Header>
                <CenterBox.Body>
                    <CenterBox.Title
                        icon={
                            <Spinner color="var(--bluessu-primary)" size={64} />
                        }
                        title="잠시만 기다려주세요"
                        subtitle="로그인을 진행하고 있어요"
                    />
                </CenterBox.Body>
                <CenterBox.Footer>
                    <Footer />
                </CenterBox.Footer>
            </CenterBox>
        );
    }

    if (!clientId) {
        return (
            <CenterBox minHeight="fit-content">
                <CenterBox.Header>
                    <img src={BlueSSULogo} className="w-[20px] h-[20px]" />
                    BlueSSU 로그인
                </CenterBox.Header>
                <CenterBox.Body>
                    <CenterBox.Title
                        title="client_id가 없어요"
                        subtitle="개발자에게 문의해주세요"
                    />
                </CenterBox.Body>
                <CenterBox.Footer>
                    <Footer />
                </CenterBox.Footer>
            </CenterBox>
        );
    }

    if (!redirectURL) {
        return (
            <CenterBox minHeight="fit-content">
                <CenterBox.Header>
                    <img src={BlueSSULogo} className="w-[20px] h-[20px]" />
                    BlueSSU 로그인
                </CenterBox.Header>
                <CenterBox.Body>
                    <CenterBox.Title
                        title="redirect_url가 없어요"
                        subtitle="개발자에게 문의해주세요"
                    />
                </CenterBox.Body>
                <CenterBox.Footer>
                    <Footer />
                </CenterBox.Footer>
            </CenterBox>
        );
    }

    if (!data) {
        return (
            <CenterBox>
                <CenterBox.Header>
                    <img src={BlueSSULogo} className="w-[20px] h-[20px]" />
                    BlueSSU 로그인
                </CenterBox.Header>
                <CenterBox.Body>
                    <CenterBox.Title
                        icon={
                            <Spinner color="var(--bluessu-primary)" size={64} />
                        }
                        title="잠시만 기다려주세요"
                        subtitle="프로젝트 정보를 가져오고 있어요"
                    />

                    <CenterBox.Description>
                        BlueSSU는 숭실대학교를 위한 Open API 프로젝트입니다.
                        계속 진행하면 BlueSSU의 개인정보 처리방침과 서비스
                        약관에 동의하는 것으로 간주해요.
                    </CenterBox.Description>
                </CenterBox.Body>
                <CenterBox.Footer>
                    <Footer />
                </CenterBox.Footer>
            </CenterBox>
        );
    }

    if (data && !data.project.isValidateRedirectUrl) {
        return (
            <CenterBox minHeight="fit-content">
                <CenterBox.Header>
                    <img src={BlueSSULogo} className="w-[20px] h-[20px]" />
                    BlueSSU 로그인
                </CenterBox.Header>
                <CenterBox.Body>
                    <CenterBox.Title
                        title="잘못된 Redirect URL이에요"
                        subtitle="개발자에게 문의해주세요"
                    />
                    <CenterBox.Description>
                        <code>
                            client_id: {clientId}
                            <br />
                            redirect_url: {redirectURL}
                        </code>
                    </CenterBox.Description>
                </CenterBox.Body>
                <CenterBox.Footer>
                    <Footer />
                </CenterBox.Footer>
            </CenterBox>
        );
    }

    if (data && data.project.oAuthStatus === "Inactive") {
        return (
            <CenterBox minHeight="fit-content">
                <CenterBox.Header>
                    <img src={BlueSSULogo} className="w-[20px] h-[20px]" />
                    BlueSSU 로그인
                </CenterBox.Header>
                <CenterBox.Body>
                    <CenterBox.Title
                        title="개발자가 OAuth를 비활성화했어요"
                        subtitle="개발자에게 문의해주세요"
                    />
                    <CenterBox.Description>
                        <code>
                            client_id: {clientId}
                            <br />
                            redirect_url: {redirectURL}
                        </code>
                    </CenterBox.Description>
                </CenterBox.Body>
                <CenterBox.Footer>
                    <Footer />
                </CenterBox.Footer>
            </CenterBox>
        );
    }

    return (
        <CenterBox>
            <CenterBox.Header>
                <img src={BlueSSULogo} className="w-[20px] h-[20px]" />
                BlueSSU 로그인
            </CenterBox.Header>
            <CenterBox.Body>
                <CenterBox.Title
                    icon={
                        <img
                            src={data?.project?.iconURL}
                            className="w-[64px] h-[64px]"
                        />
                    }
                    title={
                        <>
                            <Dialog>
                                <DialogTrigger>
                                    <span
                                        style={{
                                            color: "var(--bluessu-primary)",
                                        }}
                                    >
                                        {data.project.name}
                                    </span>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            {data.project.name}
                                        </DialogTitle>
                                        <DialogDescription>
                                            clientId: <code>{clientId}</code>
                                            <br />
                                            RedirectURL:{" "}
                                            <code>{redirectURL}</code>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                            (으)로 이동합니다
                        </>
                    }
                    subtitle="로그인할 계정을 선택해주세요"
                />

                {isLogin ? (
                    <div className="w-full px-[32px] py-[16px] ">
                        <div
                            className="flex items-center gap-2 w-full p-[8px] hover:bg-slate-100 cursor-pointer rounded border-b"
                            onClick={() => mutate()}
                        >
                            <img
                                src={user?.profileImage}
                                alt=""
                                className="h-[32px] w-[32px] rounded-full"
                            />
                            <div className="flex flex-col">
                                <div className="text-sm font-medium">
                                    {user?.name}
                                </div>
                                <div className="text-muted-foreground text-sm">
                                    {user?.studentId}
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex items-center gap-2 w-full p-[8px] hover:bg-slate-100 cursor-pointer rounded border-b"
                            onClick={() => signInAndContinue()}
                        >
                            <UserCircle size={32} />
                            <div className="flex flex-col">
                                <div className="text-sm font-medium">
                                    다른 계정 사용
                                </div>
                                <div className="text-muted-foreground text-sm">
                                    기존 계정은 로그아웃됩니다
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full px-[32px] py-[16px] ">
                        {" "}
                        <Button
                            className="w-full flex gap-2"
                            variant={"outline"}
                            onClick={() => signInAndContinue()}
                        >
                            <img src={SSULogo} alt="" className="h-[14px]" />
                            SmartID (SSO)로 계속하기
                        </Button>
                    </div>
                )}

                <CenterBox.Description>
                    계속 진행하면 BlueSSU에서 내 이름, 재학 상태, 학번, 프로필
                    사진을 {data.project.name}과(와) 공유하게 되요. 앱을
                    사용하기 전에 프로젝트의{" "}
                    <a
                        href={data.project.privacyURL}
                        className="text-[var(--bluessu-primary)] hover:underline"
                        target="_blank"
                    >
                        개인정보처리방침
                    </a>
                    과{" "}
                    <a
                        href={data.project.privacyURL}
                        className="text-[var(--bluessu-primary)] hover:underline"
                        target="_blank"
                    >
                        서비스 약관
                    </a>
                    을 검토해주세요.
                </CenterBox.Description>
            </CenterBox.Body>
            <CenterBox.Footer>
                <Footer />
            </CenterBox.Footer>
        </CenterBox>
    );
};
