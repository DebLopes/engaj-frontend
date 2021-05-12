import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import GlobalStyle from "./styles/globals";
import AppProvider from './hooks';

import Routes from "./routes";

const App = () => {
  return (
    <Router>
       <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStyle />
    </Router>
  );
};

export default App;
