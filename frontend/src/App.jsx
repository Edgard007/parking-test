import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// ==> Style config
import { GlobalStyles } from "./styles/GlobalStyles";

// ==> Components
import Loading from "./components/Loading";

// ==> Pages
const Parking = lazy(() => import("./pages/parking"));
const OfficialVehicles = lazy(() => import("./pages/officialVehicles"));
const Error403 = lazy(() => import("./pages/Error/error403"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Parking />,
    },
    {
      path: "/officialVehicles",
      element: <OfficialVehicles />,
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
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
