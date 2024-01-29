import React, { useState } from 'react'
import { SYMPTOMS } from '../assets/symptoms'
import Symptom from './Symptom'

const table_headers = ["Symptom", "Stealth", "Resistance", "Stage Speed", "Transmission", "Level", "Effect", "Required Chemical", "Threshold"];

const SymptomsTables = () => {

  const [isSelected, setSelected] = useState([]);

  function handleAddSymptom(symptom) {
    console.log("Boop",symptom);
    // check if in selected array
    isSelected.includes(symptom.id) 
    // if found, REMOVE from 
    ? isSelected.splice(isSelected.indexOf(symptom.id), 1)
    // if not found, ADD to array
    : isSelected.push(symptom.id);
    console.log("Is Selected:", isSelected);
  }

  return (
    <div className='relative overflow-x-auto'>
      <div className='w-full'>
        <table className='sm:m-10'>
          <thead>
            <tr className='font-extralight text-xs text-white bg-slate-800'>
              {table_headers.map((header, i) => <th className='break-all' key={i+"_header"}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {SYMPTOMS.map((symptom) => (
              <tr className='text-xs even:bg-gray-50 odd:bg-white
                            hover:bg-slate-900 hover:text-white duration-300' 
                  key={symptom.id+"_symptom_row"}
                  onClick={() => handleAddSymptom(symptom)}
                  >
                <Symptom key={symptom.id} {...symptom} value={symptom.id} />
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SymptomsTables