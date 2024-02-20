import React from 'react'

const SummedScores = ({stealth_s, resistance_s, stage_speed_s, transmission_s, level_s, threshold, amount}) => {
  
  const headers = ["STLTH", "RES", "STSP", "TRAN", "LEVEL", "THRSH"];
  return (
    <div className='w-full fixed h-[60px] top-0 z-0 
                  text-center flex justify-between'>
          <div className='grow flex-col'>
            <div className='bg-slate-800 text-white font-bold grow-0'>
              {headers[0]}
            </div>
            <div className='bg-slate-300 h-[30px]'>
              {stealth_s}
            </div>
          </div>
          
          <div className='grow'>
            <div className='bg-slate-800 text-white font-bold'>
              {headers[1]}
            </div>
            <div className='bg-slate-300 h-[30px]'>
              {resistance_s}
            </div>
          </div>
          
          <div className='grow'>
            <div className='bg-slate-800 text-white font-bold'>
              {headers[2]}
            </div>
            <div className='bg-slate-300 h-[30px]'>
              {stage_speed_s}
            </div>
          </div>
          
          <div className='grow'>
            <div className='bg-slate-800 text-white font-bold'>
              {headers[3]}
            </div>
            <div className='bg-slate-300 h-[30px]'>
              {transmission_s}
            </div>
          </div>
          
          <div className='grow'>
            <div className='bg-slate-800 text-white font-extrabold'>
              {headers[4]}
            </div>
            <div className='bg-slate-300 h-[30px]'>
              {isNaN(level_s) ? 0 : level_s}
            </div>
          </div>
          
          <div className='grow'>
            <div className='bg-slate-800 text-white font-bold'>
              TOTAL
            </div>
            <div className='bg-slate-300 h-[30px]'>
              {amount} / 6
            </div>
          </div>
    </div>
  )
}

export default SummedScores;