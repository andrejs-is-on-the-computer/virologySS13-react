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
    stealth_s: 0,
    resistance_s: 0,
    stage_speed_s: 0,
    transmission_s: 0,
    level_s: 0
  });

  // Updates isSelected state, and adds or subtracts from the Scores state
  function handleClick(symptom) {
    if (symptom.selected) {
      symptom.selected = false;
      // Removing from "isSelected"
      setIsSelected(isSelected.filter(a => a.id !== a.id));
      console.log("Removing", symptom.symptom);
      // Removing from scores
      setScores({
        ...scores,
        stealth_s: scores.stealth_s - symptom.stealth,
        resistance_s: scores.resistance_s - symptom.resistance,
        stage_speed_s: scores.stage_speed_s - symptom.stage_speed,
        transmission_s: scores.transmission_s - symptom.transmission,
        level_s: scores.level - symptom.level,
      });
      console.log("Removing", isSelected);
    } else {
      symptom.selected = true;
      // Adding to "isSelected"
      setIsSelected([...isSelected, symptom]);
      // Add to scores
      setScores({
        ...scores,
        stealth_s: scores.stealth_s + symptom.stealth,
        resistance_s: scores.resistance_s + symptom.resistance,
        stage_speed_s: scores.stage_speed_s + symptom.stage_speed,
        transmission_s: scores.transmission_s + symptom.transmission,
        level_s: scores.level + symptom.level
      });
      console.log("Adding", isSelected);
      // Add thresholds
    }
  }
  console.log('Selected', isSelected);

  return (
    <div>

      {/* Summed Totals */}
      <div className='h-[100px] fixed bottom-0'>
        <SummedScores amount={isSelected.length} {...scores} />
      </div>
      
      {/* Radar Chart */}
      <div className='relative w-full h-[500px] py-10 pr-10'>
        <ScoreChart amount={isSelected.length} {...scores} selected={isSelected} />
      </div>
        
        {/* SELECTED SYMPTOMS TABLE */}

        {/* TODO */}

        {/* ALL SYMPTOMS TABLE */}

          <div className=''>
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