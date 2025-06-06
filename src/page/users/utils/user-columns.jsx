import React from 'react';
import { Avatar, Button, Tooltip } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { getUserAvatarUrl } from '../../../config/service/color';

export const getUserColumns = () => {
  const navigateToUserDetails = (userId) => {
    window.location.href = `/user/${userId}`;
  };

  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Avatar',
      dataIndex: 'name',
      key: 'avatar',
      render: (name, record) => {
        return (
          <Avatar 
            size="medium" 
            src={getUserAvatarUrl(name, record.id)}
            alt={name}
          />
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => (
        <a href={`mailto:${email}`} className="text-blue-500 hover:underline">
          {email}
        </a>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => (
        <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="text-blue-500 hover:underline">
          {phone}
        </a>
      ),
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      render: (website) => (
        <a 
          href={`https://${website}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {website}
        </a>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Tooltip title="Show Albums">
          <Button
            icon={<EyeOutlined />}
            type="default"
            size="small"
            onClick={() => navigateToUserDetails(record.id)}
          >
            Show
          </Button>
        </Tooltip>
      ),
    },
  ];
};