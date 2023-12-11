import { RouterProvider } from 'react-router-dom';
import team3 from 'routes/route';

function App() {
    return (
        <>
            <div>
                <RouterProvider router={team3} />
            </div>
        </>
    );
}

export default App;
