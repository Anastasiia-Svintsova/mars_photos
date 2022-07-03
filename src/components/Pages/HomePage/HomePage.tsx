import {
  SelectChangeEvent,
  Box,
  CircularProgress,
  Container,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getRovers } from "../../../api/api";
import { Rover } from "../../../types/Rover";
import { RoverInfo } from "../../Rover/RoverInfo";
import { RoverSelector } from "../../Rover/RoverSelector";
import { ErrorAlert } from "../../Unknown/ErrorAlert";

export const HomePage = () => {
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
  };

  useEffect(() => {
    loadRovers();
  }, []);

  return (
    <Grid container flexGrow={1}>
      <Grid
        item
        lg={3}
        md={3}
        sm={4}
        display={{ xs: 'none', sm: 'block' }}
        borderRight={1}
        boxShadow={4}
      >
        {isRoversLoading && (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        {!!rovers.length && (
          <Container sx={{ mt: 3 }}>
            <RoverSelector
              rovers={rovers}
              currentRover={currentRover}
              onRoverChange={handleRoverChange}
            />
          </Container>
        )}
      </Grid>

      <Grid item xs={12} display={{ sm: 'none' }} flexGrow={1}>
        {!!rovers.length && (
          <Container sx={{ mt: 3 }}>
            <RoverSelector
              rovers={rovers}
              currentRover={currentRover}
              onRoverChange={handleRoverChange}
            />
          </Container>
        )}
      </Grid>

      <Grid item sm={8} md={9} flexGrow={1}>
        <Container sx={{ mt: 3 }}>
          {currentRover && !error && <RoverInfo rover={currentRover} />}
        </Container>
      </Grid>

      <ErrorAlert error={error} />
    </Grid>
  );
};
