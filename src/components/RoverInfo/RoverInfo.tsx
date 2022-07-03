import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FC, useCallback, useEffect, useState } from 'react';
import { getPhotos, getPhotosFromCamera } from '../../api/api';
import { Photo } from '../../types/Photo';
import { Rover } from '../../types/Rover';
import { RoverPhotos } from '../RoverPhotos';
import { usePrevious } from '../../hooks/usePrevious';

interface Props {
  rover: Rover;
}

export const RoverInfo: FC<Props> = ({ rover }) => {
  const prevRover = usePrevious(rover);
  const [date, setDate] = useState<Date>(new Date(rover.max_date));
  const showAllValue = 'ALL';
  const [camera, setCamera] = useState(showAllValue);
  const [photos, setPhotos] = useState<Photo[]>([]);

  console.log(rover);


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

    const data = camera === showAllValue
      ? await getPhotos(rover.name, dateToString)
      : await getPhotosFromCamera(rover.name, dateToString, camera);

    setPhotos(data);
  }, [date, rover, camera]);

  useEffect(() => {
    if (prevRover !== rover) {
      setDate(new Date(rover.max_date));
      setCamera(showAllValue);
    }

    loadPhotos();
  }, [loadPhotos, prevRover, rover]);

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Camera</InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={camera}
          label="Rovers"
          onChange={handleCameraChange}
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

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="Date"
            inputFormat="yyyy-MM-dd"
            value={date}
            onChange={handleDateChange}
            maxDate={new Date(rover.max_date)}
            closeOnSelect
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>

      {photos && <RoverPhotos photos={photos} />}
    </div>
  )
}
