import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Container, Button, Divider } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
          <Button color="inherit" component={Link} to="/" sx={{ fontSize: '1.2rem' }}>
            Home
          </Button>
          <Divider orientation="vertical" flexItem sx={{ borderColor: 'white', marginX: 1 }} />
          <Button color="inherit" component={Link} to="/about" sx={{ fontSize: '1.2rem' }}>
            About
          </Button>
          <Divider orientation="vertical" flexItem sx={{ borderColor: 'white', marginX: 1 }} />
          <Button color="inherit" component={Link} to="/counter" sx={{ fontSize: '1.2rem' }}>
            Counter
          </Button>
          <Divider orientation="vertical" flexItem sx={{ borderColor: 'white', marginX: 1 }} />
          <Button color="inherit" component={Link} to="/calculation" sx={{ fontSize: '1.2rem' }}>
            Calculation
          </Button>
          <Divider orientation="vertical" flexItem sx={{ borderColor: 'white', marginX: 1 }} />
          <Button color="inherit" component={Link} to="/timer" sx={{ fontSize: '1.2rem' }}>
            Timer
          </Button>
          <Divider orientation="vertical" flexItem sx={{ borderColor: 'white', marginX: 1 }} />
          <Button color="inherit" component={Link} to="/colorGenerator" sx={{ fontSize: '1.2rem' }}>
            Color Generator
          </Button>
          <Divider orientation="vertical" flexItem sx={{ borderColor: 'white', marginX: 1 }} />
          <Button color="inherit" component={Link} to="/colorPicker" sx={{ fontSize: '1.2rem' }}>
            Color Picker
          </Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
