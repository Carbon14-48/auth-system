import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import NavbarPage from "./routes/NavbarPageRouter";
import HomePage from "./pages/HomePage";
import GetStartedPage from "./pages/GetStartedPage";
import FullPageRoute from "./routes/FullPageRoute";
import ErrorPage from "./pages/ErrorPage";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<NavbarPage />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/" element={<FullPageRoute />}>
          <Route path="getstarted" element={<GetStartedPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </>
    )
  );

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
