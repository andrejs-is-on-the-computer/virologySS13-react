import React, { useState } from 'react';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';

const returnArray = (array) => {
  if (Object.keys(array[0]).length > 2) {
    return (
      <ul>
      {array.map((x, i) => (
        <li className='text-xs text-nowrap' key={i+"_thresh_list_"+x.name}>
          -<span className='text-nowrap'  title={x.title} key={i+"_threshold_"+x.name}>
            {x.name} {x.value}
          </span>
        </li>
      ))}
      </ul>
    )
  } else {
    return (
      <ul>
      {array.map((x, i) => (
  
          <li key={i+"_chem_li_"+x.name}>
            -<a className='font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline' 
            target="_blank" 
            href={x.link}
            key={i+"_chemical_"+x.name}
            >
              {x.name} 
            </a>
          </li>
      ))}
      </ul>
    )
  }
}

const emptySymptoms = [{
    id: 'none',
    selected: false,
    symptom: '---',
    stealth: '---',
    resistance: '---',
    stage_speed: '---',
    transmissions: '---',
    level: '---',
    required_chemical: [{name: '---', link: '', value: '', title: ''}],
    effect: '---',
    threshhold: [{name: '---', link: '', value: '', title: ''}],
}];

const headers = ['SYMPTOM', 'STEALTH', 'RESISTANCE', 'STAGE SPEED', 'TRANSMISSION', 'LEVEL', 'REQUIRED CHEMICAL', 'EFFECT', 'THRESHOLD'];

const SelectedSymptoms = ({ rows, counts, sendDataToParent }) => {
  const [show, setShow] = useState(true);

  // Handling deselecting elements, sending updated array to parent
  const handleClick = (row) => {
    sendDataToParent(row);
  }

  function hideShow() {
    let tempShow = show;
    setShow(!tempShow);
  }

  function clearAll() {
    sendDataToParent('CLEAR');
  }

  return (
      <div className=''>
        <table className='w-full table-fixed'>
          <thead className=''>
            <tr className='text-white bg-slate-800 uppercase select-none'>
              {headers.map((entry, index) => (
                <th 
                  className={`text-xs ${index > 0 && index < 7 ? 'flex-none' : 'grow'}`} 
                  key={`${index}-all-head`}
                >
                  {entry}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!show ? '' : rows.length === 0 
              ? <tr className='even:bg-gray-50 odd:bg-white'>
              {headers.map((x) => {
                return <td className='border-[1px] border-dotted border-gray-400 text-center'>---</td>
              })}
              </tr>
              : rows.map((row, index) => (
              <tr 
                key={`${index}-all-row`} 
                className={`cursor-pointer hover:bg-slate-900 hover:text-white duration-300 even:bg-gray-50 odd:bg-white`}
                onClick={() => handleClick(row)}
                >
                {Object.values(row).slice(2).map((entry, columnIndex) => 
                  <td key={`${columnIndex}-all-column`} className={`max-w-[300px] border-[1px] border-dotted border-gray-400 ${columnIndex >= 6 || columnIndex == 0 ? 'text-xs' : 'text-center'}`}>
                    {Array.isArray(entry) ? returnArray(entry) : entry}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className='h-4 bg-slate-800'><td colSpan={9}></td></tr>
          </tfoot>
          {/* <tfoot className='uppercase text-white font-bold text-center sticky top-[20px]'>
            <tr className='text-white bg-slate-800 uppercase select-none'>
              <td rowSpan={2} className='text-center border-[1px] border-dotted border-gray-400'>
                {rows.length} / 6
              </td>
              <td className='text-center border-[1px] border-dotted border-gray-400'>
                {counts.stealth}
              </td>
              <td className='text-center border-[1px] border-dotted border-gray-400'>
                {counts.resistance}
              </td>
              <td className='text-center border-[1px] border-dotted border-gray-400'>
                {counts.stage_speed}
              </td>
              <td className='text-center border-[1px] border-dotted border-gray-400'>
                {counts.transmission}
              </td>
              <td rowSpan={2} className='text-center border-[1px] border-dotted border-gray-400'>
                {counts.level}
              </td>

              <td rowSpan={2} colSpan={3}
                onClick={() => clearAll()}  
                className={`text-center border-[1px] border-dotted border-gray-400
                  cursor-pointer hover:bg-slate-600 duration-150`}>
                <div>CLEAR ALL</div>
              </td>
            </tr>
            <tr className='text-white bg-slate-800 uppercase select-none'>
              <td className='text-center border-[1px] border-dotted border-gray-400 text-xs'>
                {counts.stealth >= 2 ? "HIDDEN" : "NOT HIDDEN"}
              </td>
              <td className='text-center border-[1px] border-dotted border-gray-400'>
                ---
              </td>
              <td className='text-center border-[1px] border-dotted border-gray-400 text-xs'>
                {counts.stage_speed < 2 ? "2%" : `${counts.stage_speed}%`}
              </td>
              <td className='text-center border-[1px] border-dotted border-gray-400 text-xs'>
                {counts.transmission > 10 ? 'AIRBORNE' : counts.transmission > 6 ? 'SKIN CONTACT' : counts.transmission > 2 ? 'FLUID' : 'BLOOD'}
              </td>

            </tr>
          </tfoot> */}
        </table>
        <div
        onClick={hideShow} 
        className='
        text-white text-xs font-bold text-center bg-slate-600 pt-1 pb-2 cursor-pointer select-none
        hover:bg-slate-400 duration-150
        '>
          <span className=''>
            HIDE/SHOW
          </span>
        </div>
      </div>
  )
}

export default SelectedSymptoms