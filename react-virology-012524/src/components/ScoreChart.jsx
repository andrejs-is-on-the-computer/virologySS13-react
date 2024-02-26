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
  ComposedChart,
  Customized
} from 'recharts';


const ScoreChart = ({stealth_s, resistance_s, stage_speed_s, transmission_s, thresholds}) => {

  const data = [
    {
      stat: "Stealth",
      value: stealth_s,
      // fill: stealth_s > -1 ? "#27ae60" : "#900C3F",
    },
    {
      stat: "Resistance",
      value: resistance_s,
      // fill: resistance_s > -1 ? "#27ae60" : "#900C3F",
    },
    {
      stat: "Stage Speed",
      value: stage_speed_s,
      // fill: stage_speed_s > -1 ? "#27ae60" : "#900C3F",
    },
    {
      stat: "Transmission",
      value: transmission_s,
      // fill: transmission_s > -1 ? "#27ae60" : "#900C3F",
    },
  ];

  thresholds.map((t, i) => {
    switch(t.name) {
      case "Stealth":
        data[0][`${i}symp`] = t.stat;
        data[0][`${i}value`] = t.value;
        break;
      case "Resistance":
        data[1][`${i}symp`] = t.stat;
        data[1][`${i}value`] = t.value;
        break;
      case "Stage Speed":
        data[2][`${i}symp`] = t.stat;
        data[2][`${i}value`] = t.value;
        break;
      case "Transmission":
        data[3][`${i}symp`] = t.stat;
        data[3][`${i}value`] = t.value;
        break;
      default:
        break;
    }
  });
  const getThreshes = (ts) => {
    var transdob = Object.values(ts);
    console.log(transdob);
    return transdob.slice(2).map((t, i, arr) => {
      return i % 2 === 0 ? 
      <li>
      {t} - {arr[i+1]}
    </li> 
    : null;
    });
  };

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='p-4 rounded-xl bg-white border border-sky-500'>
          <p><b>{payload[0].payload.stat}</b></p>
          <p><b>Value:</b> {payload[0].payload.value}</p>
          <b>Thresholds:</b>
          <ul>
            {
              getThreshes(payload[0].payload)
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

      <Bar dataKey="value" fill="blue" />

      <Scatter dataKey="0value" fill="red" />
      <Scatter dataKey="1value" fill="red" />
      <Scatter dataKey="2value" fill="red" />
      <Scatter dataKey="3value" fill="red" />
      <Scatter dataKey="4value" fill="red" />
      <Scatter dataKey="5value" fill="red" />
      <Scatter dataKey="6value" fill="red" />
      <Scatter dataKey="7value" fill="red" />
      <Scatter dataKey="8value" fill="red" />
      <Scatter dataKey="9value" fill="red" />
      <Scatter dataKey="10value" fill="red" />
      <Scatter dataKey="11value" fill="red" />
      <Scatter dataKey="12value" fill="red" />
      <Scatter dataKey="13value" fill="red" />
      <Scatter dataKey="14value" fill="red" />
      <Scatter dataKey="15value" fill="red" />
      <Scatter dataKey="16value" fill="red" />
      <Scatter dataKey="17value" fill="red" />
      <Scatter dataKey="18value" fill="red" />
      <Scatter dataKey="19value" fill="red" />
      <Scatter dataKey="20value" fill="red" />
      <Scatter dataKey="21value" fill="red" />
      <Scatter dataKey="22value" fill="red" />
      <Scatter dataKey="23value" fill="red" />
      <Scatter dataKey="24value" fill="red" />
      <Scatter dataKey="25value" fill="red" />
    </ComposedChart>
  </ResponsiveContainer>
  )
}

export default ScoreChart;