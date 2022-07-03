import {
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Grid,
  FormControl,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FC, useCallback, useEffect, useState } from 'react';
import { getPhotos, getPhotosFromCamera } from '../../../api/api';
import { Photo } from '../../../types/Photo';
import { Rover } from '../../../types/Rover';
import { RoverPhotos } from '../RoverPhotos';
import { usePrevious } from '../../../hooks/usePrevious';
import { ErrorAlert } from '../../Unknown/ErrorAlert';

interface Props {
  rover: Rover;
}

export const RoverInfo: FC<Props> = ({ rover }) => {
  const prevRover = usePrevious(rover);
  const showAllValue = 'ALL';

  const [date, setDate] = useState<Date>(new Date(rover.max_date));
  const [camera, setCamera] = useState(showAllValue);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCameraChange = (event: SelectChangeEvent<string>) => {
    setCamera(event.target.value);
  };

  const handleDateChange = (value: Date | null) => {
    if (value) {
      setDate(value);
    };
  };

  const loadPhotos = useCallback(async() => {
    const dateToString = date.toISOString().split('T')[0];

    try {
      setIsPhotoLoading(true);

      const data = camera === showAllValue
        ? await getPhotos(rover.name, dateToString)
        : await getPhotosFromCamera(rover.name, dateToString, camera);

      setPhotos(data);
    } catch (err) {
      setError(true);
    } finally {
      setIsPhotoLoading(false);
    }
  }, [date, rover, camera]);

  useEffect(() => {
    if (prevRover !== rover) {
      setDate(new Date(rover.max_date));
      setCamera(showAllValue);
    }

    loadPhotos();
  }, [loadPhotos, prevRover, rover]);

  return (
    <FormControl fullWidth>
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <InputLabel id="demo-simple-select-label">Camera</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={camera}
            onChange={handleCameraChange}
            label="Camera"
            fullWidth
          >
            <MenuItem value={showAllValue}>
              SHOW ALL
            </MenuItem>

            {rover.cameras.map(cam => (
              <MenuItem key={cam.id} value={cam.name}>
                {cam.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item sm={6} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ width: 1 }}>
            <MobileDatePicker
              label="Date"
              inputFormat="yyyy-MM-dd"
              value={date}
              onChange={handleDateChange}
              maxDate={new Date(rover.max_date)}
              closeOnSelect
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} sx={{ mb: 3 }}>
          {isPhotoLoading && (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}

          {photos && !error && <RoverPhotos photos={photos} />}

          {!photos.length && !isPhotoLoading && !error && (
            <Typography variant="h5">
              No photos here, try to choose another date or camera
            </Typography>
          )}

          <ErrorAlert error={error} />
        </Grid>
      </Grid>
    </FormControl>
  )
}
