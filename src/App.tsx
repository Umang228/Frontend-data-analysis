import React from 'react';
import { Container, Title, Space } from '@mantine/core';
import MaxMinProductionTable from './components/ProductionTable';
import CropStatisticsTable from './components/CropTable';
import agricultureData from './data/agriculture_data.json';

const App: React.FC = () => {
  return (
    <Container size="lg">
      <Title order={2} mt="md">
        Indian Agriculture Data Analysis
      </Title>
      <Space h="xl" />
      <MaxMinProductionTable data={agricultureData} />
      <Space h="xl" />
      <CropStatisticsTable data={agricultureData} />
    </Container>
  );
};

export default App;
