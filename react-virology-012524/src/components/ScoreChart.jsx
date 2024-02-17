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
      stat: "Stealth",
      Value: stealth_s,
    },
    {
      stat: "Resistance",
      Value: resistance_s,
    },
    {
      stat: "Stage Speed",
      Value: stage_speed_s,
    },
    {
      stat: "Transmission",
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


  // Return
  // 1. Stat name (Stealth, Transmission, etc.)
  // 2. Current value of stat
  // 3. Thresholds
  //    3-1. Threshold Symptom
  //    3-2. Threshold Value
  //    3-3. Threshold Description
  const CustomToolTip = ({label, payload}) => {
    return (
      <div>
        <p>{payload}</p>
      </div>
    );
  };

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
      <Tooltip labelFormatter={() => {return data.stat;}} />
      <ReferenceLine y={0} stroke="#000" />
      <Bar dataKey="Value" fill="#82ca9d" />
      <Scatter dataKey="value0" fill="red" />
    </ComposedChart>
  </ResponsiveContainer>
  )
}

export default ScoreChart;