import { createBrowserRouter, createRoutesFromElements,Route, RouterProvider } from "react-router-dom";

import { RootLayout } from "./Layout/RootLayout";
import Home from "./components/Home";
// import { BuildResume } from "./components/BuildResume";
import "./App.css";
import { Template } from "./components/Template";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { Page404 } from "./components/Page404";

import "./responsive.css"
import Account from "./pages/Account";
import ResumeLayout from "./Layout/ResumeLayout";
import Dashboard from "./components/Dashboard";

function App() {

  const router=createBrowserRouter(createRoutesFromElements(
    <>
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<Home/>} />
      <Route path="builresume" element={<ResumeLayout/>} />
      <Route path="template" element={<Template/>}/>
      <Route path="account" element={<Account/>}/>
      <Route path="dashboard" element={<Dashboard/>}/>
      <Route path="*" element={<Page404/>}/>
    </Route>
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    </>
  ));
   
  // ));
  return <RouterProvider router={router} />;
}

export default App;
