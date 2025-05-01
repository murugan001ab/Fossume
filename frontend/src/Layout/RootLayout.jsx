import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navibar } from "../components/Navibar";
import "./rootlayout.css";

export const RootLayout = () => {
  const location = useLocation();

  return (
    <div className="layout-container">
      <Navibar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
