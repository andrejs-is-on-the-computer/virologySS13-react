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

  const data = [
    {
      stat: "Stealth",
      value: stealth_s,
      tresh: []
    },
    {
      stat: "Resistance",
      value: resistance_s,
      tresh: []
    },
    {
      stat: "Stage Speed",
      value: stage_speed_s,
      tresh: []
    },
    {
      stat: "Transmission",
      value: transmission_s,
      tresh: []
    },
  ];

  thresholds.map((t, i) => {
    switch(t.name) {
      case "Stealth":
        data[0].tresh.push(t);
        break;
      case "Resistance":
        data[1].tresh.push(t);
        break;
      case "Stage Speed":
        data[2].tresh.push(t);
        break;
      case "Transmission":
        data[3].tresh.push(t);
        break;
      default:
        break;
    }
  });
  const getThreshes = (threshes) => {
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
      return (
        <div className='bg-white p-4'>
          <p><b>{payload[0].payload.stat}</b></p>
          <p><b>Value:</b> {payload[0].payload.value}</p>
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
      <Bar dataKey="value" fill="#82ca9d" />
      {data.tresh.map((t) => (
        <Scatter dataKey="t.value" />
      ))}
      {/* <Scatter dataKey="value0" fill="red" /> */}
    </ComposedChart>
  </ResponsiveContainer>
  )
}

export default ScoreChart;