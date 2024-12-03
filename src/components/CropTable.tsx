import React, { useMemo } from 'react';
import { Table, Title } from '@mantine/core';

interface DataEntry {
  "Crop Name": string;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string;
  "Area Under Cultivation (UOM:Ha(Hectares))": number | string;
  [key: string]: any;
}

interface CropStatistics {
  crop: string;
  averageYield: number;
  averageCultivationArea: number;
}

interface CropStatisticsTableProps {
  data: DataEntry[];
}

const CropStatisticsTable: React.FC<CropStatisticsTableProps> = ({ data }) => {
  const cropStats: CropStatistics[] = useMemo(() => {
    const grouped = data.reduce((acc: Record<string, DataEntry[]>, entry) => {
      const crop = entry["Crop Name"];
      if (!acc[crop]) {
        acc[crop] = [];
      }
      acc[crop].push(entry);
      return acc;
    }, {});

    const result: CropStatistics[] = [];

    Object.keys(grouped).forEach((crop) => {
        const entries = grouped[crop];
        const totalYield = entries.reduce(
          (sum, entry) =>
            sum +
            parseFloat(String(entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || "0"),
          0
        );
        const totalArea = entries.reduce(
          (sum, entry) =>
            sum +
            parseFloat(String(entry["Area Under Cultivation (UOM:Ha(Hectares))"]) || "0"),
          0
        );
        const count = entries.length;
      
        result.push({
          crop,
          averageYield: parseFloat((totalYield / count).toFixed(3)),
          averageCultivationArea: parseFloat((totalArea / count).toFixed(3)),
        });
      });      

    return result;
  }, [data]);

  return (
    <div>
      <Title order={3}>Crop Statistics (1950-2020)</Title>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Crop</th>
            <th>Average Yield (Kg/Ha)</th>
            <th>Average Cultivation Area (Ha)</th>
          </tr>
        </thead>
        <tbody>
          {cropStats.map((row, index) => (
            <tr key={index}>
              <td>{row.crop}</td>
              <td>{row.averageYield}</td>
              <td>{row.averageCultivationArea}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CropStatisticsTable;
