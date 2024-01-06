import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/layout/styles.css'
import { StoreContext, store } from './app/store/store.ts'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/Routes.tsx'
import 'react-calendar/dist/Calendar.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </React.StrictMode>
)