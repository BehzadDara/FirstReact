import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Container, Button, Box } from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Container maxWidth="lg">
          <Box 
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: { xs: 2, sm: 3, md: 5 },
              flexWrap: 'wrap'
            }}
          >
            <Button color="inherit" component={Link} to="/" sx={{ fontSize: '1.2rem' }}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/about" sx={{ fontSize: '1.2rem' }}>
              About
            </Button>
            <Button color="inherit" component={Link} to="/counter" sx={{ fontSize: '1.2rem' }}>
              Counter
            </Button>
            <Button color="inherit" component={Link} to="/calculation" sx={{ fontSize: '1.2rem' }}>
              Calculation
            </Button>
            <Button color="inherit" component={Link} to="/timer" sx={{ fontSize: '1.2rem' }}>
              Timer
            </Button>
            <Button color="inherit" component={Link} to="/colorGenerator" sx={{ fontSize: '1.2rem' }}>
              Color Generator
            </Button>
            <Button color="inherit" component={Link} to="/colorPicker" sx={{ fontSize: '1.2rem' }}>
              Color Picker
            </Button>
            <Button color="inherit" component={Link} to="/colorSpectrumGenerator" sx={{ fontSize: '1.2rem' }}>
              Color Spectrum Generator
            </Button>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
