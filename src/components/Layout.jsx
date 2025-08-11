// src/components/Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  const location = useLocation();
  const hideHeader = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}
      <Outlet />
    </>
  );
}
