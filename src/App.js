import React, { Component } from "react";

import NavBar from "./components/NavBar";
import AppRouting from "./components/Routing";

import "./assets/common.scss";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <header className="app-header">
          <h2>Employees</h2>
        </header>
        <NavBar></NavBar>
        <main>
          <AppRouting></AppRouting>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
