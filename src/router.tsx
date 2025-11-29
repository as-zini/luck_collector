import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Main from './pages/Main';

const routerConfig = [
  {
    path: "/",
    element: <Main />
  },
];

const router = createBrowserRouter(routerConfig);

export default function Router(){
  return <RouterProvider router={router}></RouterProvider>
}