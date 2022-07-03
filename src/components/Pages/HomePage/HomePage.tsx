import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getRovers } from "../../../api/api";
import { Rover } from "../../../types/Rover";
import { RoverInfo } from "../../RoverInfo";

export const HomePage = () => {
  const [currentRoverName, setCurrentRoverName] = useState('');
  const [currentRover, setCurrentRover] = useState<Rover | null>(null);
  const [rovers, setRovers] = useState<Rover[]>([]);
  const [isRoversLoading, setIsRoversLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadRovers = async () => {
    try {
      setIsRoversLoading(true);
      const data = await getRovers();
      setRovers(data);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setIsRoversLoading(false);
    }
  };

  const handleRoverChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    const rover = rovers.find(item => item.name === value);

    if (rover) {
      setCurrentRover(rover);
    };

    setCurrentRoverName(value);

  };

  useEffect(() => {
    loadRovers();
  }, []);

  return (
    <div>
      {isRoversLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Rovers</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentRoverName}
            label="Rovers"
            onChange={handleRoverChange}
          >
            {rovers.map(rover => (
              <MenuItem key={rover.id} value={rover.name}>
                {rover.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {error && (
        <Alert severity="error">Something went wrong, try reloading the page</Alert>
      )}

      {currentRover && <RoverInfo rover={currentRover} />}
    </div>
  )
}
