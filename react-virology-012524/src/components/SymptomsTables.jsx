import React, { useState } from 'react'
import { SYMPTOMS } from '../assets/symptoms'
import Symptom from './Symptom'
import SelectedSymptoms from './SelectedSymptoms';
import SummedScores from './SummedScores';

const table_headers = ["Symptom", "Stealth", "Resistance", "Stage Speed", "Transmission", "Level", "Effect", "Required Chemical", "Threshold"];
// 0, 6, 7

const SymptomsTables = () => {

  const [isSelected, setIsSelected] = useState([]);
  const [scores, setScores] = {
    stlth: 0,
    res: 0,
    stsp: 0,
    tran: 0,
    lvl: 0,
    thrsh: ""
  };

  function handleClick(e) {
    this.setIsSelected
  }

  return (
    <div className='min-height-full flex flex-col max-w-full'>

      {/* Summed Totals */}
      <div className=''>
        <SummedScores {...scores}  />
      </div>
        
        {/* SELECTED SYMPTOMS TABLE */}

        {/* <table className='sm:m-10 table-fixed text-xs'>
          <thead>
          <tr className='font-extralight text-xs text-white bg-slate-800 uppercase
                         '>
              {table_headers.map((header, i) => <th className='break-all' key={i+"_header"}>{header}</th>)}
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table> */}

        {/* <table className='sm:m-10 table-fixed '>
          
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
        </table> */}

        {/* ALL SYMPTOMS TABLE */}
        
          <table className='sm:m-10 table-fixed text-xs'>
            <thead>
              <tr className='text-white bg-slate-800 uppercase'>
                {table_headers.map((header, i) => <th className='w-40' key={i+"_header"}>{header}</th>)}
              </tr>
            </thead>
            <tbody>
              {SYMPTOMS.map((symptom) => (
                <tr className={`${symptom.selected ? "bg-blue-300" : "even:bg-gray-50 odd:bg-white"}
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
  )
}

export default SymptomsTables