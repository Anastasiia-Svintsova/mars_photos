import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import React, { FC } from 'react';
import { Photo } from '../../types/Photo';

interface Props {
  photos: Photo[];
}

export const RoverPhotos: FC<Props> = ({ photos }) => (
  <div>
    <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
      {photos.map(photo => (
        <Card sx={{ maxWidth: 400 }} key={photo.id}>
          <CardMedia
            component="img"
            height="400"
            image={photo.img_src}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {`Camera: ${photo.camera.name}`}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {`Date: ${photo.earth_date}`}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  </div>
)
