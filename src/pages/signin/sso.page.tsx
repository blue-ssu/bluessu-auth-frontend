import { CenterBox, Spinner } from "../../components";

import BlueSSULogo from "../../assets/bluessu.png";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Footer } from "@/containers/Footer/Footer";
import { useSSO } from "@/hooks/useSSO";

export const SSOPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { mutate, isLoading } = useSSO({
        onSuccess: () => {
            navigate("/");
        },
    });

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
                <img src={BlueSSULogo} className="w-[20px] h-[20px]" />
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
                <Footer />
            </CenterBox.Footer>
        </CenterBox>
    );
};
