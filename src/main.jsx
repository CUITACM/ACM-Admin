import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Hello from "./components/Hello";

ReactDOM.render(
  <AppContainer>
    <Hello framework="React" />
  </AppContainer>,
  document.getElementById("app-root")
);