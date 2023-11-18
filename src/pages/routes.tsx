import { createBrowserRouter } from 'react-router-dom';
import HomePage from './Home/Home';
import WeatherDetails from './WeatherDetails/WeatherDetails';
import RootLayout from '../components/layouts/RootLayout/RootLayout';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/weather/:id', element: <WeatherDetails /> },
    ],
  },
]);

export default routes;
