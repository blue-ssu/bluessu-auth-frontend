import { RouteObject } from "react-router-dom";
import { SignInPage } from "./index.page";
import { SSOPage } from "./sso.page";
import { RedirectPage } from "./redirect.page";

export const signInRouter: RouteObject[] = [
    {
        path: "/signin",
        element: <SignInPage />,
    },
    {
        path: "/signin/sso",
        element: <SSOPage />,
    },
    {
        path: "/signin/redirect",
        element: <RedirectPage />,
    },
];
