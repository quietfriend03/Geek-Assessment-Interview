import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { getColumns } from '../utils/album-column';
import { fetchAlbums } from '../utils/album-api';

export const AlbumTable = () => {
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const loadAlbums = async () => {
      setLoading(true);
      try {
        const { albums: albumsData, users: usersData } = await fetchAlbums();
        setAlbums(albumsData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching albums:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAlbums();
  }, []);

  return (
    <div className="bg-white rounded-md shadow-md p-1">
      <h2 className="text-xl font-semibold p-3 border-b">Albums List</h2>
      <div className="overflow-x-auto">
        <Table
          columns={getColumns(users)}
          dataSource={albums}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100'],
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} albums`,
          }}
          className="custom-table"
          rowClassName={() => "custom-table-row"}
          size="large"
          scroll={{ x: 'max-content' }}
        />
      </div>
    </div>
  );
};