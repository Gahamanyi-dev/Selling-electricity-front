import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/buy-token.component";
import Tutorial from "./components/meter.component";
import TutorialsList from "./components/meters-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/tutorials"} className="navbar-brand">
            SellTOk
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Meters
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Buy
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/token"} className="nav-link">
                token
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
            <Route exact path="/add" component={AddTutorial} />
            <Route path="/tutorials/:id" component={Tutorial} />
            <Route path="/token" component={Tutorial} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
