import { CenterBox, Spinner } from "../../components";

import BlueSSULogo from "../../assets/bluessu.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/containers/Footer/Footer";
import { useUser } from "@/hooks/useUser";

export const MainPage = () => {
    const navigate = useNavigate();
    const { user, isLoading } = useUser();

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
                <img src={BlueSSULogo} className="w-[20px] h-[20px]" />
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
                        icon={
                            <img
                                src={user?.profileImage}
                                className="w-[64px] h-[64px]"
                            />
                        }
                        title={`${user?.name}님, 반가워요!`}
                        subtitle={`${user?.department} ${user?.studentId}`}
                    />
                )}
                <CenterBox.Description>
                    이 페이지는 개발 중인 페이지입니다.
                </CenterBox.Description>
                <div className="px-[32px] py-[16px] w-full">
                    <Button
                        onClick={() => logout()}
                        className="w-full"
                        variant={"outline"}
                    >
                        로그아웃
                    </Button>
                </div>
            </CenterBox.Body>
            <CenterBox.Footer>
                <Footer />
            </CenterBox.Footer>
        </CenterBox>
    );
};
