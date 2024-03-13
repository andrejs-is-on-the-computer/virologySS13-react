import React, { useEffect, useState } from 'react';
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
  
  // Handling deselecting elements, sending updated array to parent
  const handleClick = (row) => {
    sendDataToParent(row);
  }

  return (
      <div className='mx-2'>
        <table className='w-full table-fixed '>
          <thead>
            <tr className='text-white bg-slate-800 uppercase select-none [&>*]:border-[1px] [&>*]:border-dotted [&>*]:border-gray-400'>
              {headers.map((entry, index) => (
                <th 
                  className={`text-xs [&>*]:border-[1px] [&>*]:border-dotted [&>*]:border-gray-400 ${index > 0 && index < 7 ? 'flex-none' : 'grow'}`} 
                  key={`${index}-all-head`}
                >
                  {entry}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              
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
          <tfoot className='[&>*]:border-[1px] [&>*]:border-dotted [&>*]:border-gray-400 
                          [&>*]:uppercase [&>*]:text-white [&>*]:font-bold [&>*]:text-center'>
            <tr className='text-white bg-slate-800 uppercase select-none'>
                  <td className='text-center'>
                    {rows.length} / 6
                  </td>
                  <td key={counts.stealth} className=''>
                    {counts.stealth}
                  </td>
                  <td className=''>
                    {counts.resistance}
                  </td>
                  <td className=''>
                    {counts.stage_speed}
                  </td>
                  <td className=''>
                    {counts.transmission}
                  </td>
                  <td className=''>
                    {counts.level}
                  </td>
                  <td className=''>
                  
                  </td>
                  <td className=''>
                    
                  </td>
                  <td className=''>
                    
                  </td>
            </tr>
          </tfoot>
        </table>
      </div>
  )
}

export default SelectedSymptoms