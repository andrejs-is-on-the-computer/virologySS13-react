import React, { useState } from 'react';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
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
  const [order, setOrder] = useState('desc');
  const [sortKey, setSortKey] = useState(Object.keys(rows[0])[2]);

  const filter = (event) => {
    const value = event.target.value.toLowerCase();

    if (value) {
      setRows([...rows.filter(row => {
        // console.log('filter', Object.values(row).join(''));
        return Object.values(row)
          .join('')
          .toLowerCase()
          .includes(value)
      })])
    } else {
      setRows(rows)
    }
  };
  const sort = (event) => {
    const returnValue = order === 'desc' ? 1 : -1;
    console.log('-----------------------------------');
    // console.log('returnValue', returnValue);
    // console.log('argument', event.target.firstChild.data.toLowerCase());
    // console.log('order', order);
    const value = event.target ? event.target.firstChild.data.toLowerCase() : sortKey;
    // console.log('value', value);
    setSortKey(value);
    setRows([...sortedRows.sort((a,b) => {
      return a[value] > b[value]
            ? returnValue * -1
            : returnValue
    })])
  };
  const updateOrder = (event) => {
    const updatedOrder = order === 'asc' ? 'desc' : 'asc';

    setOrder(updatedOrder);
    sort(sortKey);
  };

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
        <select onChange={sort}>
          {Object.keys(rows[0]).slice(2).map((entry, index) => (
            <option value={entry} key={index}>
              Order by {entry.toUpperCase().split("_").join(" ")}
            </option>
          ))}
        </select>
        <button onClick={updateOrder}>Switch order ({order})</button>
      </div>
      <table className='w-full mb-[60px] table-fixed'>
        <thead>
          <tr className='text-white bg-slate-800 uppercase'>
            {Object.keys(rows[0]).slice(2).map((entry, index) => (
              <th className='cursor-pointer' value={entry} onClick={sort} key={`${index}-all-head`}>{entry.toUpperCase().split("_").join(" ")}</th>
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