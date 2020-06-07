import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { default as Home } from "./pages/Home";

const Routes = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
    </Router>
  );
};

export default Routes;
