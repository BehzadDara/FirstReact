import React from 'react';
import { Box, Container, Typography } from '@mui/material';

interface CardLayoutProps {
  title: string;
  body?: string;
}

const CardLayout: React.FC<CardLayoutProps> = ({ title, body }) => {
  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Box
        sx={{
          padding: 3,
          backgroundColor: '#f4f4f4',
          borderRadius: 2,
          boxShadow: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" sx={{ color: '#333', fontWeight: 'bold' }}>
          {title}
        </Typography>
        {body && (
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="body1" sx={{ color: '#555' }}>
              {body}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default CardLayout;
