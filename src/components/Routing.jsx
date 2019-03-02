import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Projects from "./projects/Projects";
import Employees from "./employees/Employees";
import ProjectDetails from "./projects/ProjectDetails";

class AppRouting extends Component {
  render() {
    return (
      <Switch>
        <Route path="/employees" component={Employees} />
        <Route path="/projects" component={Projects} />
        <Route path="/project/:id" component={ProjectDetails} />
        {/* <Route exact path="/" component={StartPage} /> */}
        <Redirect from="/" exact to="/employees" />
        {/* <Redirect to="/not-found" /> */}
      </Switch>
    );
  }
}

export default AppRouting;

