import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layout/app-layout';
import UserPage from './page/users';
import UserDetailPage from './page/user-detail';
import AlbumPage from './page/albums';
import AlbumDetailPage from './page/albums-detail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* Redirect root path to /user */}
          <Route index element={<Navigate to="/user" replace />} />
          <Route path="user" element={<UserPage />} />
          <Route path="user/:id" element={<UserDetailPage />} />
          <Route path="album" element={<AlbumPage />} />
          <Route path="album/:id" element={<AlbumDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;