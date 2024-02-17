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
  Scatter,
  ComposedChart
} from 'recharts';


const ScoreChart = ({stealth_s, resistance_s, stage_speed_s, transmission_s, thresholds}) => {

  // console.log("Thresholds", thresholds);

  const data = [
    {
      symptom: "Stealth",
      Value: stealth_s,
    },
    {
      symptom: "Resistance",
      Value: resistance_s,
    },
    {
      symptom: "Stage Speed",
      Value: stage_speed_s,
    },
    {
      symptom: "Transmission",
      Value: transmission_s,
    },
  ];

  thresholds.map((t, i) => {
    switch(t.name) {
      case "Stealth":
        data[0][`value${i}`] = t.value;
        data[0][`title${i}`] = t.title;
        break;
      case "Resistance":
        data[1][`value${i}`] = t.value;
        data[1][`title${i}`] = t.title;
        break;
      case "Stage Speed":
        data[2][`value${i}`] = t.value;
        data[2][`title${i}`] = t.title;
        break;
      case "Transmission":
        data[3][`value${i}`] = t.value;
        data[3][`title${i}`] = t.title;
        break;
      default:
        break;
    }
  });

  console.log("We looked at the data...", data);

  return (
  <ResponsiveContainer width="100%" height="100%">
    <ComposedChart
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
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey="symptom" />
      <YAxis />
      <Tooltip />
      <ReferenceLine y={0} stroke="#000" />
      <Bar dataKey="Value" fill="#82ca9d" />
      <Scatter dataKey="value0" fill="red" />
      <Scatter dataKey="value1" fill="red" />
      <Scatter dataKey="value2" fill="red" />
      <Scatter dataKey="value3" fill="red" />
      <Scatter dataKey="value3" fill="red" />
      <Scatter dataKey="value3" fill="red" />
      <Scatter dataKey="value3" fill="red" />
      <Scatter dataKey="value3" fill="red" />
      <Scatter dataKey="value3" fill="red" />
      <Scatter dataKey="value3" fill="red" />
      <Scatter dataKey="value3" fill="red" />
      <Scatter dataKey="value3" fill="red" />
      <Scatter dataKey="value3" fill="red" />
    </ComposedChart>
  </ResponsiveContainer>
  )
}

export default ScoreChart;