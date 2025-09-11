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
import Auth from "./routes/Auth";
import ErrorPage from "./pages/ErrorPage";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<NavbarPage />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </>
    )
  );

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
