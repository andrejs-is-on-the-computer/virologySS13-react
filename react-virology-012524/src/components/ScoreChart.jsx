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


const ScoreChart = ({stealth_s, resistance_s, stage_speed_s, transmission_s, selected}) => {
  // Stealth >= 2
  // Transmission:
  // <  3 : blood
  // >= 3 : fluid
  // >= 7 : skin contact
  // >= 11: airborne
  // coughing + sneezing

  const data = [
    {
      symptom: "Stealth",
      Value: stealth_s,
      threshold1: 4
    },
    {
      symptom: "Resistance",
      Value: resistance_s
    },
    {
      symptom: "Stage Speed",
      Value: stage_speed_s
    },
    {
      symptom: "Transmission",
      Value: transmission_s
    },
  ];

  selected.map((x) => {
    if(x.threshold[0].name !== "") {
      
    }
  });

  var threshes = selected.map((x) => {
    if (x.threshold[0].name === "") {
      console.log('EMPTY');
    } else {
      console.log("YEAAAH");
    }
  });

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
        {/* HOW DO I GET THE FUCKIN VALUE?!? */}
        <Bar dataKey="Value" fill="#27ae60" />
        <ReferenceLine y={0} stroke="#000" />
        <Scatter dataKey="threshold1" fill="red" />
        {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default ScoreChart