import React from 'react';
import { Switch, Route } from 'react-router-dom';

//import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import RegistrationGoals from '../pages/RegistrationGoals';
import RegistrationAward from '../pages/RegistrationAward';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} />
      <Route path="/registrationGoals" component={RegistrationGoals} />
      <Route path="/registrationAward" component={RegistrationAward} />


    </Switch>
  );
};

export default Routes;
