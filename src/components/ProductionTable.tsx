import React, { useMemo } from 'react';
import { Table, Title } from '@mantine/core';

interface DataEntry {
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": number | string;
  [key: string]: any;
}

interface AggregatedData {
  year: string;
  maxProductionCrop: string;
  minProductionCrop: string;
}

interface MaxMinProductionTableProps {
  data: DataEntry[];
}

const MaxMinProductionTable: React.FC<MaxMinProductionTableProps> = ({ data }) => {
  const aggregatedData: AggregatedData[] = useMemo(() => {
    const grouped = data.reduce((acc: Record<string, DataEntry[]>, entry) => {
      const year = entry.Year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(entry);
      return acc;
    }, {});

    const result: AggregatedData[] = [];

    Object.keys(grouped).forEach((year) => {
        const entries = grouped[year as string]; // Explicitly type `year` as a string
      
        const maxEntry = entries.reduce((prev, current) =>
          parseFloat(String(current["Crop Production (UOM:t(Tonnes))"]) || "0") >
          parseFloat(String(prev["Crop Production (UOM:t(Tonnes))"]) || "0")
            ? current
            : prev
        );
      
        const minEntry = entries.reduce((prev, current) =>
          parseFloat(String(current["Crop Production (UOM:t(Tonnes))"]) || "0") <
          parseFloat(String(prev["Crop Production (UOM:t(Tonnes))"]) || "0")
            ? current
            : prev
        );
      
        result.push({
          year,
          maxProductionCrop: maxEntry["Crop Name"],
          minProductionCrop: minEntry["Crop Name"],
        });
      });      

    return result;
  }, [data]);

  return (
    <div>
      <Title order={3} mb="md">Crops with Max & Min Production per Year</Title>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Year</th>
            <th>Crop with Maximum Production</th>
            <th>Crop with Minimum Production</th>
          </tr>
        </thead>
        <tbody>
          {aggregatedData.map((row, index) => (
            <tr key={index}>
              <td>{row.year}</td>
              <td>{row.maxProductionCrop}</td>
              <td>{row.minProductionCrop}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MaxMinProductionTable;
