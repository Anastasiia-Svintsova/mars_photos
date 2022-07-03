import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import { FC } from 'react';
import { Photo } from '../../../types/Photo';

interface Props {
  photos: Photo[];
}

export const RoverPhotos: FC<Props> = ({ photos }) => (
  <Grid container spacing={2}>
    {photos.map(photo => (
      <Grid
        item
        key={photo.id}
        lg={4}
        md={6}
        sm={12}
        flexGrow={1}
      >
        <Card
          sx={{
            maxWidth: 400,
            width: 1,
            ml: 'auto',
            mr: 'auto'
          }}
        >
          <CardMedia
            component="img"
            height="300"
            image={photo.img_src}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="subtitle1">
                Camera:
              <br />
              {photo.camera.name}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {`Date: ${photo.earth_date}`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
)
