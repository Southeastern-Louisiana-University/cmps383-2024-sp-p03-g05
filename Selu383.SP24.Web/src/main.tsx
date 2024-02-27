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
import App from './App.tsx'
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Header from "./elements/NavigationBar.tsx"
import SignUp from './routes/login/sign-up.tsx';
import Home from './routes/home.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorPage/>
  },{
    path:"/sign-up",
    element:<SignUp/>,
    errorElement:<ErrorPage/>
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
