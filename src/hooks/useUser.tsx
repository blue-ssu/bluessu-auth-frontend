import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const getUser = async () => {
    const res = await axios.get(
        `${import.meta.env.VITE_CORE_SERVER}/users/me`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data.user as {
        id: number;
        name: string;
        studentId: string;
        department: string;
        profileImage: string;
        roles: string[];
        createdAt: string;
    };
};

export const useUser = (option?: { requireLogin: boolean }) => {
    const navigate = useNavigate();
    const { data, isLoading } = useQuery(["users", "me"], getUser, {
        enabled: localStorage.getItem("token") !== null,
        onError: () => {
            localStorage.removeItem("token");
            navigate("/signin");
        },
    });

    if (option?.requireLogin !== false && !localStorage.getItem("token")) {
        navigate("/auth/signin");
    }

    return {
        user: data,
        isLoading,
        isLogin: !!localStorage.getItem("token"),
    };
};
