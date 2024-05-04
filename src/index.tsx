import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = createRoot(document.getElementById('root')!);

const domain = 'dev-e6aokm5atm7izdmv.us.auth0.com';
const clientId = 'wHFLsNyZ1taCb3ttkzgU1ebmp0eDzG6p';

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    {...({} as any)} // Casting to 'any' to bypass TypeScript error
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>
);
