import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { signInRouter } from "./pages/signin/router";
import { NotFoundPage } from "./pages/NotFound";
import { mainRouter } from "./pages/main/router";
import { oAuthRouter } from "./pages/oauth/router";

const A = () => <div>A</div>;

const router = createBrowserRouter([
    {
        path: "*",
        element: <A />,
        errorElement: <NotFoundPage />,
    },
    {
        path: "/",
        children: mainRouter,
    },
    {
        path: "/signin",
        children: signInRouter,
    },
    {
        path: "/oauth",
        children: oAuthRouter,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
