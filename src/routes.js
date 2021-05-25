import React from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";
import DashboardView from "./views/DashboardView";
import AccountView from "./views/AccountView";
import TaskView from "./views/TaskView";
import DevicesView from "./views/DevicesView";
import FarmView from "./views/FarmView";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import OTPView from "./views/auth/OTPView";
import NotFoundView from "./views/errors/NotFoundView";
import MonitorView from "./views/MonitorView";

const routes = [
  {
    path: "app",
    element: <DashboardLayout />,
    children: [
      
      { path: "devices", element: <DevicesView /> },
      { path: "monitor", element: <MonitorView /> },
      { path: "farms", element: <FarmView /> },
      { path: "account", element: <AccountView /> },
      { path: "dashboard", element: <DashboardView /> },
      { path: "tasks", element: <TaskView /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "login", element: <LoginView /> },
      { path: "register", element: <RegisterView /> },
      { path: "verify", element: <OTPView /> },
      { path: "404", element: <NotFoundView /> },
      { path: "/", element: <Navigate to={localStorage.getItem("verified")&&localStorage.getItem("token")?"/app/devices":"login"} /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
