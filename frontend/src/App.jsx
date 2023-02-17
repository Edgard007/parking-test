import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// ==> Style config
import { GlobalStyles } from "./styles/GlobalStyles";

// ==> Components
import Loading from "./components/Loading";
import Navbar from "./Layout/Navbar";

// ==> Pages
const Parking = lazy(() => import("./pages/Parking/parking"));
const TypeVehicles = lazy(() => import("./pages/Type-vehicle/type-vehicle"));
const Vehicles = lazy(() => import("./pages/Vehicles/vehicles"));
const Error403 = lazy(() => import("./pages/Error/error403"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Parking />,
      name: "Estacionamiento",
    },
    {
      path: "/TypeVehicles",
      element: <TypeVehicles />,
      name: "Tipo de Vehiculos",
    },
    {
      path: "/Vehicles",
      element: <Vehicles />,
      name: "Vehiculos",
    },
    {
      path: "*",
      element: <Error403 />,
    },
  ]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <GlobalStyles />
        <Navbar />
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
