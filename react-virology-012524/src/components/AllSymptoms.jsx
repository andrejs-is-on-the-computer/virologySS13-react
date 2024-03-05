import React, { useState } from 'react'

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

  const handleClick = (row) => {
    let sorted = [...sortedRows];
    let clicked = {...sorted[row.id]};
    clicked.selected = !clicked.selected;
    sorted[row.id] = clicked;
    setRows([...sorted]);
  }

  return (
    <table className='w-full mb-[60px] table-fixed'>
      <thead>
        <tr className='text-white bg-slate-800 uppercase'>
          {Object.keys(rows[0]).slice(2).map((entry, index) => (
            <th key={`${index}-all-head`}>{entry.toUpperCase().split("_").join(" ")}</th>
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
  )
}

export default AllSymptoms