import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';


const ScoreChart = ({stealth, resistance, stage_speed, transmission, level, threshold, amount}) => {

  const data = [
    {
      symptom: "Stealth",
      value: stealth,
      fullMark: 20
    },
    {
      symptom: "Resistance",
      value: resistance,
      fullMark: 20
    },
    {
      symptom: "Stage Speed",
      value: stage_speed,
      fullMark: 20
    },
    {
      symptom: "Transmission",
      value: transmission,
      fullMark: 20
    },
    {
      symptom: "Level",
      value: level,
      fullMark: 20
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={1000}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="symptom" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="value" fill="#8884d8" />
        {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ScoreChart