import React from 'react';
import { UserTable } from './table';

export const UserPage = () => {
  return (
    <div className="flex flex-col p-3 overflow-auto">
      <UserTable />
    </div>
  );
};