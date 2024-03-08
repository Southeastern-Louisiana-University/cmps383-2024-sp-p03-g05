// Importing React Stuff //
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


// Importing CSS //
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'

// Importing Pages //
import ErrorPage from "./error-page";
import SignUp from './routes/login/sign-up.tsx';
import Home from './routes/home.tsx';
import Login from './routes/login/login.tsx';
import Header from "./elements/NavigationBar.tsx"
import Hotels  from './routes/hotel/index.tsx';
import FindHotel from './routes/hotel/search.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Header/>,
    children: [
    {
      path: "/",
      element: <Home />,
    }, {
      path: "/hotels",
      element: <Hotels />,
    },{
      path: "/hotel-search",
      element: <FindHotel />,
    },{
      path: "/login",
      element: <Login />,
    }, {
      path: "/login/signup",
      element: <SignUp />,
    },
  ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <RouterProvider router={router} />
  ,
)
