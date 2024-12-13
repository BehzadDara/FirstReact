import React from 'react';
import Card from '../layouts/Card.tsx';
import withLogger from "../higherOrderComponents/withLogger.tsx";

const NotFound: React.FC = () => {
  return (
    <Card title="Page Not Found" />
  );
};

export default withLogger(NotFound);
