import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AuthLayout from "../src/components/layout/AuthLayout";
import ProtectedLayout from "../src/components/layout/ProtectedLayout";
import SignupPage from "../src/pages/SignupPage";
import SigninPage from "../src/pages/SigninPage";
import NotFound from "../src/pages/NotFound";
import Home from "../src/pages/Home";

export const route = createBrowserRouter(
  createRoutesFromElements([
    <Route element={<AuthLayout />}>
      <Route path="/sign-up" element={<SignupPage />} />
      <Route path="/sign-in" element={<SigninPage />} />
    </Route>,
    <Route element={<ProtectedLayout />}>
      <Route path="/" element={<Home />} />
    </Route>,
    <Route path="*" element={<NotFound />} />,
  ])
);
