import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layout/app-layout';
import UserPage from './page/users';
import UserDetailPage from './page/user-detail';
import AlbumPage from './page/albums';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<h1>Home Page</h1>} />
          <Route path="user" element={<UserPage />} />
          <Route path="user/:id" element={<UserDetailPage />} />
          <Route path="album" element={<AlbumPage />} />
          <Route path="album/:id/photos" element={<h1>Album Photos Page</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;