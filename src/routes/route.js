import RootLayout from 'layout/layout';
import Detail from 'page/datail/datail';
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
            {
                path: '/detail/:issueId',
                element: <Detail />,
            },
        ],
    },
]);
export default router;
