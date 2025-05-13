import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { getColumns } from "../utils/columns";
import { fetchUsers } from "../utils/user-api";
// import '../assets/styles.css';

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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-xl font-semibold p-4 border-b">Users List</h2>
      <div>
        <Table
          columns={getColumns()}
          dataSource={users}
          loading={loading}
          rowKey="id"
          pagination={false}
          className="custom-table"
          rowClassName={() => "custom-table-row"}
          size="large" // Makes rows taller
        />
      </div>
    </div>
  );
};