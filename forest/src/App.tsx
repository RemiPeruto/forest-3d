import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes";

import './App.css';

interface Props {}

const App: React.FunctionComponent<Props> = ()  => {
  return (
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
  );
};

export default App;