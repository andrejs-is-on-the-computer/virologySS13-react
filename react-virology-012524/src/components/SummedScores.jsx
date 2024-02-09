import React from 'react'

const SummedScores = ({stealth, resistance, stage_speed, transmission, level, threshold, amount}) => {
  
  const headers = ["STLTH", "RES", "STSP", "TRAN", "LEVEL", "THRSH"];
  return (
    <div className='fixed w-[60px] h-full top-0 z-0 
                  text-center bg-slate-500
                  border-r-[1px] border-gray-400
                  flex flex-col justify-between'>

          <div className='bg-slate-800 text-white font-bold'>
            {headers[0]}
          </div>
          <div className='bg-slate-300 grow'>
            {stealth}
          </div>

          <div className='bg-slate-800 text-white font-bold'>
            {headers[1]}
          </div>
          <div className='bg-slate-300 grow'>
            {resistance}
          </div>

          <div className='bg-slate-800 text-white font-bold'>
            {headers[2]}
          </div>
          <div className='bg-slate-300 grow'>
            {stage_speed}
          </div>

          <div className='bg-slate-800 text-white font-bold'>
            {headers[3]}
          </div>
          <div className='bg-slate-300 grow'>
            {transmission}
          </div>

          <div className='bg-slate-800 text-white font-extrabold'>
            {headers[4]}
          </div>
          <div className='bg-slate-300 grow'>
            {level}
          </div>

          <div className='bg-slate-800 text-white font-bold'>
            TOTAL
          </div>
          <div className='bg-slate-300 grow'>
            {amount} / 6
          </div>
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