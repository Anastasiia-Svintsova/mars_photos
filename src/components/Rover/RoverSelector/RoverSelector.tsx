import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { FC } from 'react'
import { Rover } from '../../../types/Rover'

interface Props {
  rovers: Rover[],
  currentRover: Rover | null,
  onRoverChange: (event: SelectChangeEvent<string>) => void;
}

export const RoverSelector: FC<Props> = ({ rovers, currentRover, onRoverChange}) => (
  <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Rovers</InputLabel>

    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={currentRover?.name}
      label="Rovers"
      onChange={(event) => onRoverChange(event)}
    >
      {rovers.map(rover => (
        <MenuItem key={rover.id} value={rover.name}>
          {rover.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)

