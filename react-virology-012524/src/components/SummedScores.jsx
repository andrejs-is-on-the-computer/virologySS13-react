import React from 'react'

const SummedScores = ({stlth,res,stsp,tran,lvl,thrsh}) => {
  
  const headers = ["STLTH", "RES", "STSP", "TRAN", "LEVEL", "THRSH"];

  return (
    <div className='w-full'>
      <table>
        <thead className='text-white bg-slate-800 py-4'>
          <tr>
            {headers.map((header, i) => 
              <th className='w-40' key={i+"_header"}>{header}</th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default SummedScores;