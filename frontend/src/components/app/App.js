import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './app.css';

import Footer from '../footer/Footer';

import LandingPage from '../../pages/landing/Landing';
import PageNotFound from '../../pages/pageNotFound/PageNotFound';

const App = (props) => {
  return (
    <>
      <div className="page-wrapper">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/404" component={PageNotFound} />
          <Redirect from="*" to="/404" />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default App;
