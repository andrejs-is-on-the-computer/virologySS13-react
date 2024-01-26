import React from 'react'
import { SYMPTOMS } from '../assets/symptoms'
import Symptom from './Symptom'

const table_headers = ["Symptom", "Stealth", "Resistance", "Stage Speed", "Transmission", "Level", "Effect", "Required Chemical", "Threshold"];

const SymptomsTable = () => {
  return (
    <div className='h-screen w-screen'>
      <table className='table-auto overflow-hidden p-5 my-5 mx-8'>
        <thead>
          <tr className='font-bold text-white bg-slate-800'>
            {table_headers.map((header, i) => <th key={i+"_header"}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {SYMPTOMS.map((symptom) => (
            <tr className='even:bg-gray-50 odd:bg-white text-xs' key={symptom.id+"_symptom_row"}>
              <Symptom key={symptom.id} {...symptom} />
            </tr>))}
        </tbody>
      </table>
    </div>
  )
}

export default SymptomsTable