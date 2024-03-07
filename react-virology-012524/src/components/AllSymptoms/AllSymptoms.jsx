import React, { useState } from 'react';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import './table.css';

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

const AllSymptoms = ({ rows }) => {
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
    let sorted = [...sortedRows];
    let clicked = {...sorted[row.id]};
    clicked.selected = !clicked.selected;
    sorted[row.id] = clicked;
    setRows([...sorted]);
  }

  return (
    <>
      <div className='controls'>
        <input 
          type="text"
          placeholder='Filter items'
          onChange={filter}
        />
        {/* <select onChange={sort}>
          {Object.keys(rows[0]).slice(2).map((entry, index) => (
            <option value={entry} key={index}>
              Order by {entry.toUpperCase().split("_").join(" ")}
            </option>
          ))}
        </select>
        <button onClick={updateOrder}>Switch order ({order})</button> */}
      </div>
      <table className='w-full mb-[60px] table-auto'>
        <thead>
          <tr className='text-white bg-slate-800 uppercase'>
            {Object.keys(rows[0]).slice(2).map((entry, index) => (
              <th 
                className='text-sm cursor-pointer hover:bg-slate-500 hover:text-white duration-300' 
                value={entry} 
                onClick={() => sort(entry)} 
                key={`${index}-all-head`}
              >
                {entry.toUpperCase().split("_").join(" ")}
                {console.log(sortKey)}
                <span className=''>
                  {/* <ArrowDropUpOutlinedIcon className='' /> */}
                  {/* <ArrowDropDownOutlinedIcon className={sortKey === entry ? 'text-white' : 'text-slate-600'} /> */}
                  {sortKey !== entry ? <ArrowDropDownOutlinedIcon className='text-slate-600' /> : order === 1 ? <ArrowDropDownOutlinedIcon className='text-white' /> : <ArrowDropUpOutlinedIcon className='text-white' />}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, index) => (
            <tr 
              key={`${index}-all-row`} 
              className={`hover:bg-slate-900 hover:text-white duration-300 ${row.selected ? "bg-blue-300" : "even:bg-gray-50 odd:bg-white"}`}
              onClick={() => handleClick(row)}
              >
              {Object.values(row).slice(2).map((entry, columnIndex) => 
                <td key={`${columnIndex}-all-column`} className={`max-w-[300px] border-[1px] border-dotted border-gray-400 ${columnIndex >= 6 ? 'text-sm' : 'text-center'}`}>
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
    </>
  )
}

export default AllSymptoms