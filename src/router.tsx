import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotFound } from "./components/404";
import Home from "./components/Home";

const routes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/oauth2/redirect",
    component: <Home />,
  },
];

export const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
