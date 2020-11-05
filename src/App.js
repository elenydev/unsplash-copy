import React from "react";
import MainPage from "./Components/MainPage/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact>
            <MainPage />
          </Route>
          <Route path='/photos' exact>
            <h1>Eloeloelo</h1>
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
