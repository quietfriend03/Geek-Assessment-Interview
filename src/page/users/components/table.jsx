import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { getUserColumns } from "../utils/user-columns";
import { fetchUsers } from "../utils/user-api";

export const UserTable = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="bg-white rounded-md overflow-auto">
      <h2 className="text-xl font-semibold p-4 border-b">Users List</h2>
      <div className="overflow-x-auto"> {/* Add horizontal scrolling container */}
        <Table
          columns={getUserColumns()}
          dataSource={users}
          loading={loading}
          rowKey="id"
          pagination={false}
          className="custom-table"
          rowClassName={() => "custom-table-row"}
          size="large" // Makes rows taller
          scroll={{ x: 'max-content' }} // Enable horizontal scrolling
        />
      </div>
    </div>
  );
};