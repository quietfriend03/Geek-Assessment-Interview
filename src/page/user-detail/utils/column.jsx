import React from 'react';
import { Button, Tooltip } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

export const getAlbumColumns = (onViewPhotos) => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title) => (
        <span className="capitalize">{title}</span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Tooltip title="View Photos">
          <Button
            icon={<EyeOutlined />}
            type="default"
            size="small"
            onClick={() => onViewPhotos(record.id)}
          >
            Show
          </Button>
        </Tooltip>
      ),
    },
  ];
};