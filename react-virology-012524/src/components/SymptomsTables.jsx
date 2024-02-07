import React, { useState } from 'react'
import { SYMPTOMS } from '../assets/symptoms'
import Symptom from './Symptom'
import SelectedSymptoms from './SelectedSymptoms';
import SummedScores from './SummedScores';

const table_headers = ["Symptom", "Stealth", "Resistance", "Stage Speed", "Transmission", "Level", "Effect", "Required Chemical", "Threshold"];
const short_headers = ["STLTH", "RES", "STSP", "TRAN", "LEVEL", "THRSH"];

const SymptomsTables = () => {

  const [isSelected, setIsSelected] = useState([]);
  const [scores, setScores] = useState({
    stealth: 0,
    resistance: 0,
    stage_speed: 0,
    transmission: 0,
    level: 0,
    threshold: []
  });

  // Updates isSelected state, and adds or subtracts from the Scores state
  function handleClick(symptom) {
    if (symptom.selected) {
      symptom.selected = false;
      setIsSelected(isSelected.filter(a => a.id !== a.id));
      setScores({
        ...scores,
        stealth: scores.stealth - symptom.stealth,
        resistance: scores.resistance - symptom.resistance,
        stage_speed: scores.stage_speed - symptom.stage_speed,
        transmission: scores.transmission - symptom.transmission,
        level: scores.level - symptom.level,
        threshold: []
      });
    } else {
      symptom.selected = true;
      setIsSelected([...isSelected, symptom]);
      setScores({
        ...scores,
        stealth: scores.stealth + symptom.stealth,
        resistance: scores.resistance + symptom.resistance,
        stage_speed: scores.stage_speed + symptom.stage_speed,
        transmission: scores.transmission + symptom.transmission,
        level: scores.level + symptom.level,
        threshold: []
      });
    }
  }

  return (
    <div>

      {/* Summed Totals */}
      <div>
        <SummedScores {...scores}  />
      </div>
        
        {/* SELECTED SYMPTOMS TABLE */}

        {/* TODO */}

        {/* ALL SYMPTOMS TABLE */}

          <div className='lg:p-4'>
            <table className='w-full'>
              <thead>
                <tr className='text-white bg-slate-800 uppercase'>
                  {table_headers.map((header, i) => <th key={i+"_header"}>{header}</th>)}
                </tr>
              </thead>
              <tbody>
                {SYMPTOMS.map((symptom) => (
                  <tr className={`${symptom.selected ? "bg-blue-300" : "even:bg-gray-50 odd:bg-white"}
                  hover:bg-slate-900 hover:text-white duration-300 `} 
                      key={symptom.id+"_symptom_row"}
                      onClick={() => handleClick(symptom)}
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