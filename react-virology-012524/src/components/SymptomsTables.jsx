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

  const sumOfSelected = (selectedArray) => {
    console.log('stealthtest', selectedArray.reduce((n, {stealth}) => n + stealth, 0));
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
      setAll([...data]);
      let selectedTemp = data.filter(x => x.selected);
      setSelected([...selectedTemp]);
      sumOfSelected([...selectedTemp]);
    } else {
      // Data from Selected Symptoms
      let selectedTemp = selected.filter(x => x.id !== data.id);
      setSelected([...selectedTemp]);
      sumOfSelected([...selectedTemp]);
      let allTemp = [...all];
      let updatedIndex = allTemp.map(x => x.id).indexOf(data.id);
      allTemp[updatedIndex].selected = false;
      setAll([...allTemp]);
    }
    
    // setPosition({
    //   x: e.clientX,
    //   y: e.clientY
    // });
  }

  return (
    
    <div className='w-full'>
      {/* Selected Table */}
      <div className='fixed z-10'>
      <SelectedSymptoms rows={selected} counts={counts} sendDataToParent={handleData} />
      </div>
      {/* Graph */}
      {/* <ScoreChart rows={selected} counts={counts} /> */}

      {/* Main Table */}
      <AllSymptoms rows={all} sendDataToParent={handleData}  />
    </div>
  )
}

export default SymptomsTables