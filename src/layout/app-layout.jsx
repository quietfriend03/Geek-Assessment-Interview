import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/sidebar/sidebar';

export const AppLayout = () => {
  return (
    <div className="flex bg-red-300 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}