import React, { useState, useEffect } from 'react'
import AllSymptoms from './AllSymptoms/AllSymptoms'
import { SYMPTOMS } from '../assets/symptoms'
import SelectedSymptoms from './SelectedSymptoms/SelectedSymptoms';
import ScoreChart from './ScoreChart';

const SymptomsTables = () => {
  // All symptoms
  const [all, setAll] = useState(SYMPTOMS);

  // Selected Symptoms
  const [selected, setSelected] = useState([]);

  // Totals of each stat
  const [counts, setCounts] = useState({stealth: 0, resistance: 0, stage_speed: 0, transmission: 0, level: 0});

  // Thresholds of selected symptoms
  const [thresholds, setThresholds] = useState([]);

  const sumOfSelected = (selectedArray) => {
    setCounts({
      stealth: selectedArray.reduce((n, {stealth}) => n + stealth, 0),
      resistance: selectedArray.reduce((n, {resistance}) => n + resistance, 0),
      stage_speed: selectedArray.reduce((n, {stage_speed}) => n + stage_speed, 0),
      transmission: selectedArray.reduce((n, {transmission}) => n + transmission, 0),
      level: selectedArray.reduce((n, {level}) => n + level, 0),
    });
  }

  // Receives data from either the "All" table, or the "Selected" table
  function handleData(data) {
    // Data from All Symptoms
    if (data.length === 44) {
      
      // Updating the selected status of symptoms from "All"
      setAll([...data]);

      // Updating the selected status of symptoms from "Selected"
      let selectedTemp = data.filter(x => x.selected);
      setSelected([...selectedTemp]);

      // Updating selected thresholds state
      let selectedThresholds = selectedTemp.map(s => s.threshold.map(x => x));
      setThresholds(selectedThresholds);

      // Updating the scores
      sumOfSelected([...selectedTemp]);
    } else if (data === "CLEAR") {
      // Clearing all states and resetting to default
      let tempAll = all;
      tempAll.map(x => x.selected = false);
      setAll(tempAll);
      setSelected([]);
      setThresholds([]);
      setCounts({stealth: 0, resistance: 0, stage_speed: 0, transmission: 0, level: 0});
    } else {
      // Data from Selected Symptoms
      // Updating the selected status of symptoms from "Selected"
      let selectedTemp = selected.filter(x => x.id !== data.id);
      setSelected([...selectedTemp]);

      // Updating selected thresholds state
      let selectedThresholds = selectedTemp.map(s => s.threshold.map(x => x));
      setThresholds(selectedThresholds);

      // Updating scores
      sumOfSelected([...selectedTemp]);

      // Updating the selected status of symptoms from "All"
      let allTemp = [...all];
      let updatedIndex = allTemp.map(x => x.id).indexOf(data.id);
      allTemp[updatedIndex].selected = false;
      setAll([...allTemp]);
    }
  }

  const headers = ['SYMPTOM', 'STEALTH', 'RESISTANCE', 'STAGE SPEED', 'TRANSMISSION', 'LEVEL', 'REQUIRED CHEMICAL', 'EFFECT', 'THRESHOLD'];


  return (
    
    <div className=''>
      <table className='w-full sticky top-0 table-fixed'>
        <tfoot className='uppercase text-white font-bold text-center'>
          <tr className='text-white bg-slate-800 uppercase select-none'>
            <td rowSpan={2} className='text-center border-b-[1px] border-r-[1px] border-dotted border-gray-400'>
              {selected.length} / 6
            </td>
            <td className='text-center border-b-[1px] border-r-[1px] border-dotted border-gray-400'>
              {counts.stealth}
            </td>
            <td className='text-center border-b-[1px] border-r-[1px] border-dotted border-gray-400'>
              {counts.resistance}
            </td>
            <td className='text-center border-b-[1px] border-r-[1px] border-dotted border-gray-400'>
              {counts.stage_speed}
            </td>
            <td className='text-center border-b-[1px] border-r-[1px] border-dotted border-gray-400'>
              {counts.transmission}
            </td>
            <td rowSpan={2} className='text-center border-b-[1px] border-r-[1px] border-dotted border-gray-400'>
              {counts.level}
            </td>

            <td rowSpan={2} colSpan={3}
              // onClick={() => clearAll()}  
              onClick={() => handleData("CLEAR")}  
              className={`text-center border-b-[1px] border-l-[1px] border-dotted border-gray-400
                cursor-pointer hover:bg-slate-600 duration-150`}>
              <div>CLEAR ALL</div>
            </td>
          </tr>
          <tr className='text-white bg-slate-800 uppercase select-none'>
            <td className='text-center border-[1px] border-dotted border-gray-400 text-xs'>
              {counts.stealth >= 2 ? "HIDDEN" : "NOT HIDDEN"}
            </td>
            <td className='text-center border-[1px] border-dotted border-gray-400'>
              ---
            </td>
            <td className='text-center border-[1px] border-dotted border-gray-400 text-xs'>
              {counts.stage_speed < 2 ? "2%" : `${counts.stage_speed}%`}
            </td>
            <td className='text-center border-[1px] border-dotted border-gray-400 text-xs'>
              {counts.transmission > 10 ? 'AIRBORNE' : counts.transmission > 6 ? 'SKIN CONTACT' : counts.transmission > 2 ? 'FLUID' : 'BLOOD'}
            </td>

          </tr>
        </tfoot>
      </table>
      {/* Selected Table */}
      <div className='h-full'>
        <SelectedSymptoms rows={selected} counts={counts} sendDataToParent={handleData} />
      </div>

      <div className=''>
        <ScoreChart rows={selected} counts={counts} thresholds={thresholds} />
      </div>

      <div>
        <AllSymptoms rows={all} sendDataToParent={handleData}  />
      </div>
    </div>
  )
}

export default SymptomsTables