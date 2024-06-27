import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './reset.css';
import { Provider } from 'react-redux';
import store from './store.ts';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NewFeaturePage from './pages/NewFeaturePage/NewFeaturePage.tsx';
import RequestPage from './pages/RequestPage/RequestPage.tsx';
import StatusChangePage from './pages/StatusChangePage/StatusChangePage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'request',
        element: <RequestPage />,
      },
      {
        path: 'status-change',
        element: <StatusChangePage />,
      },
      {
        path: 'new-feature',
        element: <NewFeaturePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
