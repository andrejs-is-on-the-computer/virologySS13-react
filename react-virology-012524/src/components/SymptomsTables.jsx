import React, { useState } from 'react'
import { SYMPTOMS } from '../assets/symptoms'
import Symptom from './Symptom'
import SelectedSymptoms from './SelectedSymptoms';

const table_headers = ["Symptom", "Stealth", "Resistance", "Stage Speed", "Transmission", "Level", "Effect", "Required Chemical", "Threshold"];

const SymptomsTables = () => {

  const [isSelected, setIsSelected] = useState([]);

  function handleClick(e) {
    this.setIsSelected
  }

  return (
    <div className='relative overflow-x-auto'>
      <div className='w-full'>

        {/* SELECTED SYMPTOMS TABLE */}

        <table className='sm:m-10 w-screen'>
          <thead>
            <tr className='font-extralight text-xs text-white bg-slate-800'>
              {table_headers.map((header, i) => <th className='break-all' key={i+"_header"}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {isSelected.map((symptom) => (
              <tr className={`text-xs ${symptom.selected ? "bg-blue-300" : "even:bg-gray-50 odd:bg-white"}
              hover:bg-slate-900 hover:text-white duration-300 `} 
                  key={symptom.id+"_symptom_row"}
                  onClick={() => {
                    symptom.selected = false;
                    setIsSelected(isSelected.filter(a => a.id !== symptom.id));}
                  }
                  >
                <SelectedSymptoms key={symptom.id} {...symptom} />
              </tr>))}
          </tbody>
        </table>

        </div>
        {/* ALL SYMPTOMS TABLE */}
        <div>
        <table className='sm:m-10'>
          <thead>
            <tr className='font-extralight text-xs text-white bg-slate-800'>
              {table_headers.map((header, i) => <th className='break-all' key={i+"_header"}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {SYMPTOMS.map((symptom) => (
              <tr className={`text-xs ${symptom.selected ? "bg-blue-300" : "even:bg-gray-50 odd:bg-white"}
              hover:bg-slate-900 hover:text-white duration-300 `} 
                  key={symptom.id+"_symptom_row"}
                  onClick={() => {
                    if (symptom.selected) {
                      symptom.selected = false;
                      setIsSelected(isSelected.filter(a => a.id !== a.id));
                    } else {
                      symptom.selected = true;
                      setIsSelected([...isSelected, symptom]);
                    }
                  }}
                  >
                <Symptom key={symptom.id} {...symptom} />
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SymptomsTables