import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { fetchUserAlbums } from '../utils/user-detail-api';
import { getUserAlbumsColumns } from '../utils/user-album-column';

export const UserAlbumTable = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const loadAlbums = async () => {
      if (!userId) return;
      
      setLoading(true);
      try {
        const data = await fetchUserAlbums(userId);
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAlbums();
  }, [userId]);

  const handleViewPhotos = (albumId) => {
    console.log(`Navigate to photos for album ${albumId}`);
  };

  return (
    <div className="bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold p-4 border-b">Albums List</h2>
      <div className="overflow-x-auto">
        <Table
          columns={getUserAlbumsColumns(handleViewPhotos)}
          dataSource={albums}
          loading={loading}
          rowKey="id"
          pagination={false}
          className="custom-table"
          rowClassName={() => "custom-table-row"}
          size="large"
          scroll={{ x: 'max-content' }}
        />
      </div>
    </div>
  );
};