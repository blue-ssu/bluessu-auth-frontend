import { RouteObject } from "react-router-dom";
import { OAuthSignInPage } from "./index.page";

export const oAuthRouter: RouteObject[] = [
    {
        path: "/oauth",
        element: <OAuthSignInPage />,
    },
];
