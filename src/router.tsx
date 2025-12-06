import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Main from './pages/Main';
import DetailPage from './pages/DetailPage';

const routerConfig = [
  {
    path: "/",
    element: <Main/>
  },
  {
    path: '/detail/:name',
    element: <DetailPage />
  }
];

const router = createBrowserRouter(routerConfig);

export default function Router(){
  return <RouterProvider router={router}></RouterProvider>
}