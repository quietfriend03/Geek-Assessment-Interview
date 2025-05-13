import React, { useState, useEffect } from 'react';
import { Image, Card, Skeleton, Button, Row, Col, Typography } from 'antd';
import { fetchAlbumPhotos } from '../utils/album-detail-api';

const { Text } = Typography;

export const AlbumGallery = ({ albumId }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadPhotos = async () => {
      if (!albumId) return;
      
      try {
        setLoading(true);
        const photosData = await fetchAlbumPhotos(albumId);
        setPhotos(photosData);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, [albumId]);

  // Display only first 10 photos unless showAll is true
  const displayedPhotos = showAll ? photos : photos.slice(0, 10);
  const hasMorePhotos = photos.length > 10;

  if (loading) {
    return (
      <div className="bg-white rounded-md shadow-md p-4">
        <Row gutter={[16, 16]}>
          {[...Array(5)].map((_, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card>
                <Skeleton.Image active style={{ width: '100%', height: 150 }} />
                <Skeleton active paragraph={{ rows: 1 }} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="bg-white rounded-md shadow-md p-4 text-center">
        <Text type="secondary">No photos found in this album.</Text>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <Image.PreviewGroup>
        <Row gutter={[16, 16]}>
          {displayedPhotos.map(photo => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={photo.id}>
              <Card
                hoverable
                cover={
                  <Image
                    alt={photo.title}
                    src={photo.thumbnailUrl}
                    className="object-cover h-40"
                    preview={{
                      src: photo.url,
                    }}
                  />
                }
                className="h-full flex flex-col"
              >
                <Card.Meta
                  title={<Text ellipsis={{ tooltip: photo.title }} className="capitalize">{photo.title}</Text>}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Image.PreviewGroup>
      
      {hasMorePhotos && (
        <div className="mt-6 text-center">
          <Button
            type="primary"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : `Show All (${photos.length} photos)`}
          </Button>
        </div>
      )}
    </div>
  );
};