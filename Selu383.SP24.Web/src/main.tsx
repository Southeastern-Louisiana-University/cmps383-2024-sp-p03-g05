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


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorPage/>
  },{
    path:"/login",
    element:<Login/>,
    errorElement:<ErrorPage/>
  },{
    path:"/login/signup",
    element:<SignUp/>,
    errorElement:<ErrorPage/>
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
