import { CenterBox } from "../../components";
import BlueSSULogo from "../../assets/bluessu.png";
import { Footer } from "@/containers/Footer/Footer";
import { Button } from "@/components/ui/button";
import SSULogo from "../../assets/ssu.png";

export const SignInPage = () => {
    const buttonClick = () => {
        window.location.href = `https://smartid.ssu.ac.kr/Symtra_sso/smln.asp?apiReturnUrl=${window.location.protocol}//${window.location.host}/signin/sso`;
    };

    return (
        <CenterBox>
            <CenterBox.Header>
                <img src={BlueSSULogo} className="w-[20px] h-[20px]" />
                BlueSSU 로그인
            </CenterBox.Header>
            <CenterBox.Body>
                <CenterBox.Title
                    icon={
                        <img src={BlueSSULogo} className="w-[64px] h-[64px]" />
                    }
                    title="로그인"
                    subtitle="BlueSSU에 로그인해요"
                />
                <div className="px-[32px] py-[16px] w-full">
                    <Button
                        onClick={() => buttonClick()}
                        className="w-full flex gap-2"
                        variant={"outline"}
                    >
                        <img src={SSULogo} alt="" className="h-[14px]" />
                        SmartID (SSO)로 계속하기
                    </Button>
                </div>

                <CenterBox.Description>
                    BlueSSU는 숭실대학교를 위한 Open API 프로젝트입니다. 계속
                    진행하면 BlueSSU의 개인정보 처리방침과 서비스 약관에
                    동의하는 것으로 간주해요.
                </CenterBox.Description>
            </CenterBox.Body>
            <CenterBox.Footer>
                <Footer />
            </CenterBox.Footer>
        </CenterBox>
    );
};
