import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router';
import { Header } from 'components/Header/Header';
import { PATH } from 'utils/constants';
import { notebooks } from 'data/notebooks';
import { Main } from 'pages/main/Main';
import { AboutUs } from 'pages/about/AboutUs';
import { NotFoundPage } from 'pages/notFound/NotFoundPage';

export function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path={PATH.MAIN} element={<Main />} />
        <Route path={PATH.ABOUT_US} element={<AboutUs />} />
        <Route path={PATH.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
