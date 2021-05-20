import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './app.css';

import Footer from '../footer/Footer';

import LandingPage from '../../pages/Landing';
import AboutPage from '../../pages/About';
import PageNotFound from '../../pages/PageNotFound';

const App = (props) => {
  return (
    <>
      <div className="page-wrapper">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/about" component={AboutPage} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default App;
