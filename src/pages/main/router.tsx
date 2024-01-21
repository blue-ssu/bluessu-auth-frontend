import { RouteObject } from "react-router-dom";
import { MainPage } from "./index.page";

export const mainRouter: RouteObject[] = [
    {
        path: "/",
        element: <MainPage />,
    },
];
