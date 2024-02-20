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
      tresh: []
    },
    {
      stat: "Resistance",
      Value: resistance_s,
      tresh: []
    },
    {
      stat: "Stage Speed",
      Value: stage_speed_s,
      tresh: []
    },
    {
      stat: "Transmission",
      Value: transmission_s,
      tresh: []
    },
  ];

  thresholds.map((t, i) => {
    console.log('maaaappoping',t);
    switch(t.name) {
      case "Stealth":
        data[0].tresh.push(t);
        break;
      case "Resistance":
        data[0].tresh.push(t);
        break;
      case "Stage Speed":
        data[0].tresh.push(t);
        break;
      case "Transmission":
        data[0].tresh.push(t);
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
  const getThreshes = (threshes) => {
    console.log("Chart",threshes);
    if (threshes.length > 0){
      return threshes.map((t) => {
        return <>
          <li>
            {t.stat}: {t.value}
          </li>
        </>
      })
    }
    return `No thresholds for ${threshes.stat}`;
  };

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      console.log("PAYLOAD", payload[0].payload);
      return (
        <div>
          <p>Stat: {payload[0].payload.stat}</p>
          <p>Value: {payload[0].payload.value}</p>
          <b>Thresholds:</b>
          <ul>
            {
              getThreshes(payload[0].payload.tresh)
            }
          </ul>
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
      {/* <Scatter dataKey="value0" fill="red" /> */}
    </ComposedChart>
  </ResponsiveContainer>
  )
}

export default ScoreChart;