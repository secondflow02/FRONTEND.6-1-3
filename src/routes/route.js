import RootLayout from 'layout/layout';
import MainPage from 'page/main/mainPage';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '',
                element: <MainPage />,
            },
        ],
    },
]);
export default router;
