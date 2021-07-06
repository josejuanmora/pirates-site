import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Ships from "./views/Ships";
import Ports from "./views/Ports";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/ships" />
  },
  {
    path: "/ships",
    layout: DefaultLayout,
    component: Ships
  },
  {
    path: "/ports",
    layout: DefaultLayout,
    component: Ports
  }
];
