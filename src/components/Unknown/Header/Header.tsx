import { AppBar, Container, Toolbar } from '@mui/material'
import { SiNasa } from 'react-icons/si';

export const Header = () => (
  <>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <SiNasa size={60} />
        </Toolbar>
      </Container>
    </AppBar>
  </>
)
