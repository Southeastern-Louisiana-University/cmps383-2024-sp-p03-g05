// Importing React Stuff //
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
import Hotels from './routes/hotel/index.tsx';
import FindHotel from './routes/hotel/search.tsx';
import HotelDetails from './routes/hotel/details.tsx';
import ReservationSchedule from './routes/hotel/reservation/schedule.tsx'
import Room from './routes/hotel/reservation/room.tsx';
import CreateConfirmation from './routes/confirmation/create.tsx'
import RecallConfirmation from './routes/confirmation/recall.tsx'
import MainLayout from './routes/_layout.tsx';
import MyAccount from './routes/user/myaccount.tsx';
import MyReservations from './routes/confirmation/myconfirmations.tsx';
import MyOldConfirmations from './routes/confirmation/myOldConfirmations.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      }, {
        path: "/hotels",
        element: <Hotels />,
      }, {
        path: "/hotels/search",
        element: <FindHotel />,
      }, {
        path: "/hotels/details/:id",
        element: <HotelDetails />,
        children: [
          {
            path: "schedule",
            element: <ReservationSchedule />
          }
        ]
      }, {
        path: "/hotels/details/:hotelId/confirmation/:packageId",
        element: <Room />
      }, {
        path: "/confirmation/create",
        element: <CreateConfirmation />,
      }, {
        path: "/confirmation",
        element: <MyReservations />,
      }, {
        path: "/confirmation/archives",
        element: <MyOldConfirmations />,
      }, {
        path: "/confirmation/recall/:id",
        element: <RecallConfirmation />,
      }, {
        path: "/login",
        element: <Login />,
      }, {
        path: "/login/signup",
        element: <SignUp />,
      }, {
        path: "/user/myaccount",
        element: <MyAccount />
      },
    ],

  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(

  <RouterProvider router={router} />
  ,
)
