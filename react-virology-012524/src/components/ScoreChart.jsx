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
      threshes: []
    },
    {
      stat: "Resistance",
      value: resistance_s,
      threshes: []
    },
    {
      stat: "Stage Speed",
      value: stage_speed_s,
      threshes: []
    },
    {
      stat: "Transmission",
      value: transmission_s,
      threshes: []
    },
  ];

  thresholds.map((t, i) => {
    switch(t.name) {
      case "Stealth":
        data[0]['threshes'].push(t.stat, t.value, t.colour);
        break;
      case "Resistance":
        data[1]['threshes'].push(t.stat, t.value, t.colour);
        // data[1][`${i}symp`] = t.stat;
        // data[1][`${i}value`] = t.value;
        // data[1][`${i}colour`] = t.colour;
        break;
      case "Stage Speed":
        data[2]['threshes'].push(t.stat, t.value, t.colour);
        break;
      case "Transmission":
        data[3]['threshes'].push(t.stat, t.value, t.colour);
        break;
      default:
        break;
    }
  });
  const getThreshes = (ts) => {
    var transdob = Object.values(ts);
    // console.log("Threshold", ts);
    // console.log("Keys",transdob);
    return transdob.slice(2).map((t, i, arr) => {
      return i % 3 === 0 ? 
      <li className={`text-[${arr[i+2]}]`}>
      {t} - {arr[i+1]}
    </li> 
    : null;

    });
  };

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-slate-50 p-4 rounded-xl'>
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

  const CustomizedBar = (props) => {

    return props.data.map((x) => {
      console.log('MAP',x);
      console.log('Value',x.value);
      console.log('stat',x.stat);
      return (
        <Bar dataKey="value" />
      )
    })
    // return (
    //   <Bar dataKey={props.data.value} />
    // )
  }

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
      <Customized component={CustomizedBar} />
      {/* <Bar dataKey="value" fill="#82ca9d" />

      <Scatter dataKey="0value" fill="data.0colour" />
      <Scatter dataKey="1value" fill="1colour" />
      <Scatter dataKey="2value" fill="2colour" />
      <Scatter dataKey="3value" fill="3colour" />
      <Scatter dataKey="4value" fill="4colour" />
      <Scatter dataKey="5value" fill="5colour" />
      <Scatter dataKey="6value" fill="6colour" />
      <Scatter dataKey="7value" fill="7colour" />
      <Scatter dataKey="8value" fill="8colour" />
      <Scatter dataKey="9value" fill="9colour" />
      <Scatter dataKey="10value" fill="10colour" />
      <Scatter dataKey="11value" fill="11colour" />
      <Scatter dataKey="12value" fill="12colour" />
      <Scatter dataKey="13value" fill="13colour" />
      <Scatter dataKey="14value" fill="14colour" />
      <Scatter dataKey="15value" fill="15colour" />
      <Scatter dataKey="16value" fill="16colour" />
      <Scatter dataKey="17value" fill="17colour" />
      <Scatter dataKey="18value" fill="18colour" />
      <Scatter dataKey="19value" fill="19colour" />
      <Scatter dataKey="20value" fill="20colour" /> */}
    </ComposedChart>
  </ResponsiveContainer>
  )
}

export default ScoreChart;