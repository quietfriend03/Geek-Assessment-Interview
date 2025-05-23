import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Card, Skeleton, Avatar, Typography, Divider, Breadcrumb } from 'antd';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { UserAlbumTable } from './user-album-table';
import { fetchUserById } from '../utils/user-detail-api';
import { getUserAvatarUrl } from '../../../config/service/color';

const { Title, Text } = Typography;

export const UserDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get user ID from URL parameter
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userIdFromQuery = queryParams.get('userId');
  
  // Use either the path parameter or query parameter
  const userId = id || userIdFromQuery;
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserDetails = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userData = await fetchUserById(userId);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserDetails();
  }, [userId]);

  // Go back to previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col p-3">
      {/* Navigation */}
      <div className="mb-3 ml-2">
        <Breadcrumb
          items={[
            {
              title: 'Users',
              href: '/user',
            },
            {
              title: user ? user.name : `User ${userId}`,
            },
          ]}
          className="mb-3"
        />

        {/* Back navigation with chevron and text */}
        <div 
          className="flex items-center text-blue-500 hover:text-blue-700 cursor-pointer transition-colors" 
          onClick={handleGoBack}
        >
          <ArrowLeftOutlined className="mr-2" />
          <span className="text-base">Show Users</span>
        </div>
      </div>

      {/* User card */}
      <Card className="shadow-md mb-6">
        {loading ? (
          <Skeleton avatar paragraph={{ rows: 4 }} active />
        ) : user ? (
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <Avatar 
              size={100} 
              icon={<UserOutlined />} 
              src={getUserAvatarUrl(user.name, user.id)}
              alt={user.name}
            />
            
            {/* User information */}
            <div className="flex-1">
              <Title level={3}>{user.name}</Title>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                <div>
                  <Text strong>Username:</Text> {user.username}
                </div>
                <div>
                  <Text strong>Email:</Text> <a href={`mailto:${user.email}`}>{user.email}</a>
                </div>
                <div>
                  <Text strong>Phone:</Text> <a href={`tel:${user.phone}`}>{user.phone}</a>
                </div>
                <div>
                  <Text strong>Website:</Text> <a href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a>
                </div>
                <div className="md:col-span-2">
                  <Text strong>Address:</Text> {user.address?.street}, {user.address?.suite}, {user.address?.city}, {user.address?.zipcode}
                </div>
                <div className="md:col-span-2">
                  <Text strong>Company:</Text> {user.company?.name} - {user.company?.catchPhrase}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-6">User not found</div>
        )}
      </Card>

      {/* Albums section */}
      <Divider orientation="left">User Albums</Divider>
      {userId && <UserAlbumTable userId={userId} />}
    </div>
  );
};