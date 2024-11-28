import React from 'react';
import Card from '../layouts/Card.tsx';

const About: React.FC = () => {
  return (
    <Card
      title="About This App"
      body="This is a simple To-Do list app built with React."
    />
  );
};

export default About;