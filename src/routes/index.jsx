import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

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

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/registrationGoals" component={RegistrationGoals} isPrivate />
      <Route path="/registrationAward" component={RegistrationAward} isPrivate/>
{/* 
      <Route path="/profile" component={Dashboard} isPrivate />
      <Route path="/dashboard" component={Profile} isPrivate /> */}
    </Switch>
  );
};

export default Routes;

