import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useDevLocation from "../hooks/useDevLocation";
import { FlexibleLayout } from "../layout";
import useRedirectPath from "../hooks/useRedirectPath";

export function Router() {
  return (
    <BrowserRouter window={window}>
      <FlexibleLayout>
        <AppRoutes />
      </FlexibleLayout>
    </BrowserRouter>
  )
}

export function AppRoutes() {
  useDevLocation();
  useRedirectPath();

  return (
    <Routes>
      
    </Routes>
  )
}