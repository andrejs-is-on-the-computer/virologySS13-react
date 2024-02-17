import React from 'react'

const SummedScores = ({stealth_s, resistance_s, stage_speed_s, transmission_s, level, threshold, amount}) => {
  
  const headers = ["STLTH", "RES", "STSP", "TRAN", "LEVEL", "THRSH"];
  return (
    <div className='fixed w-full h-[60px] top-0 z-0 
                  text-center bg-slate-500
                  border-r-[1px] border-gray-400
                  flex justify-between'>
          <div className='grow flex-col'>
            <div className='bg-slate-800 text-white font-bold grow-0'>
              {headers[0]}
            </div>
            <div className='bg-slate-300 h-[50px]'>
              {stealth_s}
            </div>
          </div>
          
          <div className='grow'>
            <div className='bg-slate-800 text-white font-bold'>
              {headers[1]}
            </div>
            <div className='bg-slate-300 h-[50px]'>
              {resistance_s}
            </div>
          </div>
          
          <div className='grow'>
            <div className='bg-slate-800 text-white font-bold'>
              {headers[2]}
            </div>
            <div className='bg-slate-300 h-[50px]'>
              {stage_speed_s}
            </div>
          </div>
          
          <div className='grow'>
            <div className='bg-slate-800 text-white font-bold'>
              {headers[3]}
            </div>
            <div className='bg-slate-300 h-[50px]'>
              {transmission_s}
            </div>
          </div>
          
          <div className='grow'>
            <div className='bg-slate-800 text-white font-extrabold'>
              {headers[4]}
            </div>
            <div className='bg-slate-300 h-[50px]'>
              {level}
            </div>
          </div>
          
          <div className='grow'>
            <div className='bg-slate-800 text-white font-bold'>
              TOTAL
            </div>
            <div className='bg-slate-300 h-[50px]'>
              {amount} / 6
            </div>
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