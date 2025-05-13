import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Skeleton, Typography, Divider, Avatar, Space } from 'antd';
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

  return (
    <div className="flex flex-col p-3">
      {/* Back button */}
      <Button 
        type="link" 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/album')}
        className="self-start mb-4"
      >
        Back to Albums
      </Button>

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
                  <Button 
                    type="link" 
                    onClick={() => navigate(`/user/${user.id}`)}
                    className="p-0"
                  >
                    {user.name}
                  </Button>
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