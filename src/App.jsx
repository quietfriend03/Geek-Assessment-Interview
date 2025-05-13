import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './layout/app-layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<h1>Home Page</h1>} />
          <Route path="user" element={<h1>About Page</h1>} />
          <Route path="album" element={<h1>Services Page</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;