import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import router from './router/router';
import Banner from './components/banner/banner';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <CookiesProvider>
      <RouterProvider router={ router } />
      <Footer />
    </CookiesProvider>
  </>
);
