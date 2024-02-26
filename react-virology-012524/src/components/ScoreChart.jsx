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
      fill: stealth_s > 0 ? "#27ae60" : "#900C3F",
      threshes: []
    },
    {
      stat: "Resistance",
      value: resistance_s,
      fill: resistance_s > 0 ? "#27ae60" : "#900C3F",
      threshes: []

    },
    {
      stat: "Stage Speed",
      value: stage_speed_s,
      fill: stage_speed_s > 0 ? "#27ae60" : "#900C3F",
      threshes: []
    },
    {
      stat: "Transmission",
      value: transmission_s,
      fill: transmission_s > 0 ? "#27ae60" : "#900C3F",
      threshes: []
    },
  ];

  thresholds.map((t, i) => {
    switch(t.name) {
      case "Stealth":
        // data[0][`${i}symp`] = t.stat;
        data[0][`${i}value`] = t.value;
        // data[0][`${i}fill`] = t.fill;
        data[0]['threshes'].push({
          tname: t.name,
          tstat: t.stat, 
          tvalue: t.value, 
          tfill: t.fill
        });
        break;
      case "Resistance":
        // data[1][`${i}symp`] = t.stat;
        data[1][`${i}value`] = t.value;
        // data[1][`${i}fill`] = t.fill;
        data[1]['threshes'].push({
          tname: t.name,
          tstat: t.stat, 
          tvalue: t.value, 
          tfill: t.fill
        });
        break;
      case "Stage Speed":
        // data[2][`${i}symp`] = t.stat;
        data[2][`${i}value`] = t.value;
        // data[2][`${i}fill`] = t.fill;
        data[2]['threshes'].push({
          tname: t.name,
          tstat: t.stat, 
          tvalue: t.value, 
          tfill: t.fill
        });
        break;
      case "Transmission":
        // data[3][`${i}symp`] = t.stat;
        data[3][`${i}value`] = t.value;
        // data[3][`${i}fill`] = t.fill;
        data[3]['threshes'].push({
          tname: t.name,
          tstat: t.stat, 
          tvalue: t.value, 
          tfill: t.fill
        });
        break;
      default:
        break;
    }
  });

  const getThreshes = (ts) => {
    // var transdob = Object.values(ts);
    var transdob = ts.threshes;
    // return transdob.slice(2).map((tmap, getIndex, arr) => {
    return transdob.map((tmap, getIndex, arr) => {
      return getIndex % 3 === 0 ? <li className={`text-[${arr[getIndex+2]}]`}>{`- ${arr[getIndex]}: ${arr[getIndex+1]}`}</li> : null
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

  // var fill = dataObj.value > 0 ? "#27ae60" : "#900C3F";

  // const customBarContent = (customP) => {
  //   const keys = Object.keys(customP);
  //   console.log("keys", keys);
  // }

  const customScatterContent = (customP) => {
    console.log('input', customP);
    const result = customP.map((stat) => 
      stat.threshes.map((t) => {
        console.log('t',t)
        return (<Scatter dataKey="t.tvalue" />)
      })
    )
    console.log('result',result[0]);

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

        <ReferenceLine y={0} stroke="#000" />

        <Tooltip content={<CustomToolTip />} />

        {/* {customBarContent(data)} */}
        


        <Bar dataKey="value" fill="fill" />

        {customScatterContent(data)}

        {/* <Scatter dataKey="0value" fill="red" /> */}
        {/* {console.log('test',<Scatter dataKey="0value" fill="red" />)} */}

        {/* <Scatter dataKey="0value" fill="red" />
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
        <Scatter dataKey="25value" fill="red" /> */}

      </ComposedChart>

    </ResponsiveContainer>
  )

}

export default ScoreChart;