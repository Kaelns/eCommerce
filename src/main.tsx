import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from '@/app/store';
import { router } from '@/app/router/router';
import { Provider } from 'react-redux';
import { MuiTheme } from '@/app/config/mui-theme/MuiTheme';
import { RouterProvider } from 'react-router-dom';
import '@/app/styles/index.scss';

// * Define global if it's undefined
window.global ||= window;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MuiTheme>
        <RouterProvider router={router} />
      </MuiTheme>
    </Provider>
  </React.StrictMode>
);
