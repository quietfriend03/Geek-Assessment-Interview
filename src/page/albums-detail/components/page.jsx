import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Card, Skeleton, Typography, Divider, Avatar, Space, Breadcrumb } from 'antd';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { AlbumGallery } from './album-gallery';
import { fetchAlbumDetails } from '../utils/album-detail-api';
import { getUserAvatarUrl } from '../../../config/service/color';

const { Title, Text } = Typography;

export const AlbumDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const albumIdFromQuery = queryParams.get('albumId');
  
  // Use either the path parameter or query parameter
  const albumId = id || albumIdFromQuery;
  
  const [album, setAlbum] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAlbumDetails = async () => {
      if (!albumId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { album: albumData, user: userData } = await fetchAlbumDetails(albumId);
        setAlbum(albumData);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching album details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAlbumDetails();
  }, [albumId]);

  // Go back to previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  // Go to user detail page
  const goToUserDetail = () => {
    if (user) {
      navigate(`/user/${user.id}`);
    }
  };

  return (
    <div className="flex flex-col p-3">
      {/* Navigation */}
      <div className="mb-4">
        <Breadcrumb
          items={[
            {
              title: 'Albums',
              href: '/album',
            },
            {
              title: album ? album.title : `Album ${albumId}`,
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
          <span className="text-base">Show Albums</span>
        </div>
      </div>

      {/* Album Info Card */}
      <Card className="shadow-md mb-6">
        {loading ? (
          <Skeleton avatar paragraph={{ rows: 2 }} active />
        ) : album ? (
          <div className="flex flex-col">
            <Title level={3} className="capitalize">{album.title}</Title>
            
            {/* User info */}
            {user && (
              <div className="mt-2">
                <Text type="secondary" className="mb-2">Album by:</Text>
                <Space>
                  <Avatar 
                    size="small" 
                    src={getUserAvatarUrl(user.name, user.id)}
                    alt={user.name}
                  />
                  <span 
                    className="text-blue-500 hover:text-blue-700 cursor-pointer transition-colors"
                    onClick={goToUserDetail}
                  >
                    {user.name}
                  </span>
                </Space>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center p-6">Album not found</div>
        )}
      </Card>

      {/* Photo Gallery */}
      <Divider orientation="left">Album Photos</Divider>
      {albumId && <AlbumGallery albumId={albumId} />}
    </div>
  );
};