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
      Value: stealth
    },
    {
      symptom: "Resistance",
      Value: resistance
    },
    {
      symptom: "Stage Speed",
      Value: stage_speed
    },
    {
      symptom: "Transmission",
      Value: transmission
    },
    {
      symptom: "Level",
      Value: level
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
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="symptom" />
        <YAxis />
        <Tooltip />
        {/* HOW DO I GET THE FUCKIN VALUE?!? */}
        <Bar dataKey="Value" fill="#27ae60" />
        <ReferenceLine y={0} stroke="#000" />
        {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ScoreChart