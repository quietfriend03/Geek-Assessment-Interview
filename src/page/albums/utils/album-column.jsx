import React from 'react';
import { Button, Tooltip, Tag, Avatar, Space } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getUserAvatarUrl, getUserColor } from '../../../config/service/color';

export const getColumns = (users) => {
  const navigateToAlbumPhotos = (albumId) => {
    window.location.href = `/album/${albumId}/photos`;
  };

  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      width: 80,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title) => (
        <span className="capitalize">{title}</span>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'User',
      dataIndex: 'userId',
      key: 'user',
      render: (userId) => {
        const user = users[userId];
        if (!user) return <span>Unknown User</span>;
        
        const backgroundColor = getUserColor(userId);
        
        return (
          <Link to={`/user/${userId}`}>
            <Space>
              <Avatar 
                size="small" 
                src={getUserAvatarUrl(user.name, userId)}
                style={{ border: `2px solid #${backgroundColor}` }}
              />
              <span>{user.name}</span>
            </Space>
          </Link>
        );
      },
      filters: Object.values(users).map(user => ({ text: user.name, value: user.id })),
      onFilter: (value, record) => record.userId === value,
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Tooltip title="View Photos">
          <Button
            icon={<EyeOutlined />}
            type="primary"
            shape="round"
            size="middle"
            onClick={() => navigateToAlbumPhotos(record.id)}
          >
            Show
          </Button>
        </Tooltip>
      ),
    },
  ];
};