import axios from "axios";
import { useMutation } from "react-query";

const postSSO = async (sToken: string) => {
    const res = await axios.post(
        `${import.meta.env.VITE_CORE_SERVER}/auth/sso`,
        {
            sToken,
        }
    );
    return res.data;
};

export const useSSO = (option?: { onSuccess: (token: string) => void }) => {
    const { mutate, isLoading } = useMutation(
        (sToken: string) => postSSO(sToken),
        {
            onSuccess: (data) => {
                localStorage.setItem("token", data.token);
                option?.onSuccess(data.token);
            },
            onError: (err) => {
                console.log(err);
            },
        }
    );

    return {
        mutate,
        isLoading,
    };
};
