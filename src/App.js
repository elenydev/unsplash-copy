import React, { Suspense } from "react";
import MainPage from "./Components/MainPage/index";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

const ResultPage = React.lazy(() => import("./Components/ResultPage/index"));

const App = () => {
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Router>
          <Switch>
            <Route path='/' exact>
              <MainPage />
            </Route>
            <Route path='/photos' exact>
              <ResultPage />
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </>
  );
};

export default withRouter(App);
