import React from 'react';
import { Button, Tooltip } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

export const getUserAlbumsColumns = (onViewPhotos) => [
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
    title: 'Action',
    key: 'action',
    width: 120,
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