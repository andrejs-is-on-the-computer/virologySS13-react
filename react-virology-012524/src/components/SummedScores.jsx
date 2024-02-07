import React from 'react'

const SummedScores = ({...scores}) => {
  
  const headers = ["STLTH", "RES", "STSP", "TRAN", "LEVEL", "THRSH"];
  return (
    <div>
      <ul>
        <li>
          <div>
            {headers[0]}
          </div>
          <div>
            {scores.stealth}
          </div>
        </li>
      </ul>
    </div>
    // <div>
    //   <table className='w-full'>
    //     <thead className='text-white bg-slate-800 py-4'>
    //       <tr>
    //         {headers.map((header, i) => 
    //           <th className='w-40' key={i+"_header"}>{header}</th>
    //         )}
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr className='text-black py-4 bg-slate-200'>
    //         <td>
    //           {scores.stealth}
    //         </td>
    //         <td>
    //           {scores.resistance}
    //         </td>
    //         <td>
    //           {scores.stage_speed}
    //         </td>
    //         <td>
    //           {scores.transmission}
    //         </td>
    //         <td>
    //           {scores.level}
    //         </td>
    //         <td>
    //           {scores.threshold}
    //         </td>
    //       </tr>
    //     </tbody>
    //   </table>
    // </div>
  )
}

export default SummedScores;