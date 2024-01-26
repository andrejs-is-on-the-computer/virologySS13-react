import React from 'react'
import { SYMPTOMS } from '../assets/symptoms'
import Symptom from './Symptom'

const table_headers = ["Symptom", "Stealth", "Resistance", "Stage Speed", "Transmission", "Level", "Effect", "Required Chemical", "Threshold"];

const SymptomsTable = () => {
  return (
    <div>
      <table className='table-auto h-screen w-screen overflow-hidden'>
        <thead>
          <tr className='font-bold text-white bg-slate-800'>
            {table_headers.map((header, i) => <th key={i+"_header"}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {SYMPTOMS.map((symptom) => (
            <tr className='even:bg-gray-50 odd:bg-white' key={symptom.id+"_symptom_row"}>
              {console.log(symptom)}
              <Symptom key={symptom.id} {...symptom} />
            </tr>))}
        </tbody>
      </table>
    </div>
  )
}

export default SymptomsTable