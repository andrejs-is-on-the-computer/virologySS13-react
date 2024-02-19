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


  // Return
  // 1. Stat name (Stealth, Transmission, etc.) %
  // 2. Current value of stat %
  // 3. Thresholds 
  //    3-1. Threshold Symptom %
  //    3-2. Threshold Value %
  //    3-3. Threshold Description %
  const getThreshes = (threshes) => {
    let list = `<ul>`;
    if (Object.keys(threshes).length > 2){
      for (const [key, value] of Object.entries(threshes)){
        list += `<li>${key}: ${value}</li>`;
      }
      return list += `</ul>`;
    }
    return `No thresholds for ${threshes.stat}`;
  };

  // console.log(thresholds);

  const CustomToolTip = ({ active, payload}) => {
    if (active && payload && payload.length) {
      // console.log("Payload:",payload[0].payload);
      return (
        <div>
          <p>Stat: {payload[0].payload.stat}</p>
          <p>Value: {payload[0].payload.value}</p>
          <b>Thresholds:</b>
            {/* Checking and displaying thresholds */}
            {
              getThreshes(payload[0].payload)
            }
        </div>
      );
    }

    return null;
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
      <XAxis dataKey="stat" />
      <YAxis />
      <Tooltip content={<CustomToolTip />} />
      <ReferenceLine y={0} stroke="#000" />
      <Bar dataKey="Value" fill="#82ca9d" />
      <Scatter dataKey="value0" fill="red" />
    </ComposedChart>
  </ResponsiveContainer>
  )
}

export default ScoreChart;