import React from 'react';
import { Avatar, Button, Space, Tooltip } from 'antd';
import { 
  ShareAltOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  GlobalOutlined,
} from '@ant-design/icons';

// Helper for share functionality
const shareUser = (user) => {
  if (navigator.share) {
    navigator.share({
      title: `User: ${user.name}`,
      text: `Check out ${user.name}'s profile`,
      url: window.location.href,
    })
    .catch(error => console.log('Error sharing:', error));
  } else {
    // Fallback for browsers that don't support Web Share API
    console.log('Web Share API not supported');
  }
};

export const getColumns = () => [
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
    render: (name) => {
      // Format name for API call (replace spaces with + signs)
      const formattedName = name.replace(/\s+/g, '+');
      
      return (
        <Avatar 
          size="medium" 
          src={`https://ui-avatars.com/api/?name=${formattedName}&background=random&color=fff`}
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
      <Space size="middle">
        <Tooltip title="Share">
          <Button 
            icon={<ShareAltOutlined />} 
            shape="circle" 
            onClick={() => shareUser(record)}
          />
        </Tooltip>
        <Tooltip title="Email">
          <Button 
            icon={<MailOutlined />} 
            shape="circle" 
            onClick={() => window.location.href = `mailto:${record.email}`}
          />
        </Tooltip>
        <Tooltip title="Call">
          <Button 
            icon={<PhoneOutlined />} 
            shape="circle" 
            onClick={() => window.location.href = `tel:${record.phone.replace(/[^\d+]/g, '')}`}
          />
        </Tooltip>
        <Tooltip title="Visit Website">
          <Button 
            icon={<GlobalOutlined />} 
            shape="circle" 
            onClick={() => window.open(`https://${record.website}`, '_blank')}
          />
        </Tooltip>
      </Space>
    ),
  },
];