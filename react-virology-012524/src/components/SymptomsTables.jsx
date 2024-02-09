import React, { useState } from 'react'
import { SYMPTOMS } from '../assets/symptoms'
import Symptom from './Symptom'
import SelectedSymptoms from './SelectedSymptoms';
import SummedScores from './SummedScores';
import ScoreChart from './ScoreChart';

const table_headers = ["Symptom", "Stealth", "Resistance", "Stage Speed", "Transmission", "Level", "Effect", "Required Chemical", "Threshold"];
const short_headers = ["STLTH", "RES", "STSP", "TRAN", "LEVEL", "THRSH"];

const SymptomsTables = () => {

  const [isSelected, setIsSelected] = useState([]);
  const [isThresholds, setIsThresholds] = useState([]);
  const [scores, setScores] = useState({
    stealth: 0,
    resistance: 0,
    stage_speed: 0,
    transmission: 0,
    level: 0
  });

  // Updates isSelected state, and adds or subtracts from the Scores state
  function handleClick(symptom) {
    if (symptom.selected) {
      symptom.selected = false;
      // Removing from "isSelected"
      setIsSelected(isSelected.filter(a => a.id !== a.id));
      // Removing from scores
      setScores({
        ...scores,
        stealth: scores.stealth - symptom.stealth,
        resistance: scores.resistance - symptom.resistance,
        stage_speed: scores.stage_speed - symptom.stage_speed,
        transmission: scores.transmission - symptom.transmission,
        level: scores.level - symptom.level
      });
    } else {
      symptom.selected = true;
      // Adding to "isSelected"
      setIsSelected([...isSelected, symptom]);
      // Add to scores
      setScores({
        ...scores,
        stealth: scores.stealth + symptom.stealth,
        resistance: scores.resistance + symptom.resistance,
        stage_speed: scores.stage_speed + symptom.stage_speed,
        transmission: scores.transmission + symptom.transmission,
        level: scores.level + symptom.level
      });
    }
  }

  return (
    <div>

      {/* Summed Totals */}
      <div>
        <SummedScores amount={isSelected.length} {...scores} />
      </div>
      
      {/* Radar Chart */}
      <div className='relative w-full h-[500px] p-10'>
        <ScoreChart amount={isSelected.length} {...scores} {...isThresholds} />
      </div>
        
        {/* SELECTED SYMPTOMS TABLE */}

        {/* TODO */}

        {/* ALL SYMPTOMS TABLE */}

          <div className='ml-[60px]'>
            <table className='w-full'>
              <thead>
                <tr className='text-white bg-slate-800 uppercase sticky top-0'>
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