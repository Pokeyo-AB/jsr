import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { EntryPointContainer, loadEntryPoint, RelayEnvironmentProvider } from 'react-relay';
import { environment, environmentProvider } from './environment';
import AppEntryPoint from './App.entrypoint';

const entrypointReference = loadEntryPoint(environmentProvider, AppEntryPoint, {
  owner: "facebook",
  name: "relay"
});

ReactDOM.render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback="Loading...">
        <EntryPointContainer entryPointReference={entrypointReference} props={{}} />
      </Suspense>
    </RelayEnvironmentProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
