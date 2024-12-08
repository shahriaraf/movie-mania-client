import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {

  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root';
import Home from './Components/Home';
import AllMovies from './Components/AllMovies';
import AddMovie from './Components/AddMovie';
import ErrorPage from './Components/ErrorPage';
import MovieDetails from './Components/MovieDetails';
import AuthProvider from './Providers/AuthProvider';
import Login from './Components/Login';
import Register from './Components/Register';
import FavoriteMovies from './Components/FavoriteMovies';
import TvSeries from './Components/TvSeries';
import PrivateRoute from './Components/PrivateRoute';
import UpdateMovie from './Components/UpdateMovie';




const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>, // Assuming Root is a layout or wrapper component
    children: [
      {
        path: "/",
        element: <Home></Home>, // Home is the main page
      },
      {
        path: "/all-movies",
        element: <AllMovies></AllMovies>, // Home is the main page
      },
      {
        path: "/add-movies",
        element: <PrivateRoute><AddMovie></AddMovie></PrivateRoute>, // Home is the main page
      },
      {
        path: "/movie-details/:id",
        element: <PrivateRoute><MovieDetails></MovieDetails></PrivateRoute>, // Home is the main page
      },
      {
        path: "/login",
        element: <Login></Login>// Home is the main page
      },
      {
        path: "/register",
        element: <Register></Register>// Home is the main page
      },
      {
        path: "/favorite-movies",
        element: <PrivateRoute><FavoriteMovies></FavoriteMovies></PrivateRoute>// Home is the main page
      },
      {
        path: "/tv-series",
        element: <TvSeries></TvSeries>// Home is the main page
      },
      {
        path: "/update-movie/:id",
        element: <PrivateRoute><UpdateMovie></UpdateMovie></PrivateRoute>// Home is the main page
      }

    ]
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>, // Home is the main page
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
