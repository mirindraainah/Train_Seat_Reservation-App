import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "../app/GuestLayout/GuestLayout";
import LandingPage from "../app/GuestLayout/landingPage";
import DefaultLayout from "../app/defaultLayout/DefaultLayout";
import Reservation from "../app/defaultLayout/Reservation";
import { Train } from "../app/Voyageur/Train";
import { AjoutReservation } from "../app/Voyageur/AjoutReservation";
import { Connexion } from "../app/Auth/Connexion";
import { Ajout } from "../app/Admin/Ajout";
import { Inscription } from "../app/Auth/Inscription";
import AdminReservation from "../app/defaultLayout/AdminReservation";
const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/trainCompany" />,
      },
      { path: "/connexion", element: <Connexion /> },
      { path: "/inscription", element: <Inscription /> },
      { path: "/trainCompany", element: <LandingPage /> },
    ],
  },

  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/trains",
        element: <Train />,
      },
      {
        path: `/trains/:numTrain/reserver`,
        element: <AjoutReservation />,
      },
      { path: "/reservation", element: <Reservation /> },
      { path: "/trains/ajout", element: <Ajout key={123} /> },
      { path: "/trains/:id/modifier", element: <Ajout key={1234} /> },
      { path: "Admin/trains/reservation", element: <AdminReservation /> },
    ],
  },
]);
export default router;
