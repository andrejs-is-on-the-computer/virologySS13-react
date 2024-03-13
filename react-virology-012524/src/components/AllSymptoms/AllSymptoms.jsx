import React, { useState, useEffect } from 'react';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';

const returnArray = (array) => {
  if (Object.keys(array[0]).length > 2) {
    return (
      <ul>
      {array.map((x, i) => (
        <li key={i+"_thresh_list_"+x.name}>
          -<span  title={x.title} key={i+"_threshold_"+x.name}>
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
  return array[0].name;
}

const AllSymptoms = ({ rows, sendDataToParent }) => {
  const [sortedRows, setRows] = useState(rows);
  const [order, setOrder] = useState(1);
  const [sortKey, setSortKey] = useState(Object.keys(rows[0])[2]);

  // Text input to filter results
  const filter = (event) => {
    const value = event.target.value.toLowerCase();
    if (value) {
      setRows([...rows.filter(row => {
        return Object.values(row)
          .join('')
          .toLowerCase()
          .includes(value)
      })])
    } else {
      setRows(rows)
    }
  };
  // Attached to column headers, click to order, click again to reverse order
  const sort = (event) => {
    const value = event ? event.toLowerCase().split(" ").join("_") : sortKey;
    const returnValue = value === sortKey && order === 1 ? -1 : 1;
    setOrder(returnValue);
    setSortKey(value);
    setRows([...sortedRows.sort((a,b) => {
      return a[value] > b[value]
            ? returnValue * -1
            : returnValue
    })])
  };
  // Handling selecting and deselecting elements
  const handleClick = (row) => {
    row.selected = !row.selected;
    let temp = sortedRows.map((symp) => {
      return symp.id === row.id ? row : symp;
    });
    setRows([...temp]);
    sendDataToParent([...temp]);
  }

  return (
    <div className='mx-2'>
      <div className='controls'>
        <input 
          type="text"
          placeholder='Filter items'
          onChange={filter}
        />
      </div>
      <table className='w-full mb-[60px] table-fixed'>
        <thead>
          <tr className='text-white bg-slate-800 uppercase select-none sticky'>
            {Object.keys(rows[0]).slice(2).map((entry, index) => (
                <th 
                  className={`
                  text-xs cursor-pointer hover:bg-slate-500 hover:text-white duration-300
                  ${index > 0 && index < 7 ? 'flex-none' : 'grow'}
                  `}
                  value={entry} 
                  onClick={() => sort(entry)} 
                  key={`${index}-all-head`}
                >
                  {/* {index} */}
                  {entry.toUpperCase().split("_").join(" ")}
                  <span className=''>
                    {sortKey !== entry ? <ArrowDropDownOutlinedIcon className='text-slate-600' /> : order === 1 ? <ArrowDropDownOutlinedIcon className='text-white' /> : <ArrowDropUpOutlinedIcon className='text-white' />}
                  </span>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((symptomRow, index) => (
            <tr 
              key={`${index}-all-row`} 
              className={`cursor-pointer hover:bg-slate-900 hover:text-white duration-300 ${symptomRow.selected ? "bg-blue-300" : "even:bg-gray-50 odd:bg-white"}`}
              onClick={() => handleClick(symptomRow)}
              >
               {Object.values(symptomRow).slice(2).map((entry, columnIndex) => 
                <td key={`${columnIndex}-all-column`} 
                className={
                  `max-w-[300px] border-[1px] border-dotted border-gray-400 
                  ${columnIndex >= 6 || columnIndex == 0 ? 'text-xs' : 'text-center'}
                  
                  `}>
                  {Array.isArray(entry) ? returnArray(entry) : entry}
                </td>
                )}
            </tr>
          ))}
        </tbody>
      </table>
      {!sortedRows.length && (
        <h1 className='text-4xl text-center'>No results... Try expanding the search</h1>
      )}
    </div>
  )
}

export default AllSymptoms