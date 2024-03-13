import React, { useState, useEffect } from 'react'
import AllSymptoms from './AllSymptoms/AllSymptoms'
import { SYMPTOMS } from '../assets/symptoms'
import SelectedSymptoms from './SelectedSymptoms/SelectedSymptoms';

const SymptomsTables = () => {
  // All symptoms
  const [all, setAll] = useState(SYMPTOMS);

  // Selected Symptoms
  const [selected, setSelected] = useState([]);

  function handleData(data) {

    if (data.length === 44) {
      setAll([...data]);
      let selectedTemp = data.filter(x => x.selected);
      setSelected([...selectedTemp]);

    } else {

      console.log('from selected', data);
      let selectedTemp = selected.filter(x => x.id !== data.id);
      setSelected([...selectedTemp]);

      let allTemp = [...all];
      let updatedIndex = allTemp.map(x => x.id).indexOf(data.id);
      allTemp[updatedIndex].selected = false;
      setAll([...allTemp]);
    }
  }

  return (
    
    <div className='w-full'>
      {/* Selected Table */}
      <div className='fixed z-10'>
      <SelectedSymptoms rows={selected} sendDataToParent={handleData} />
      </div>
      {/* Graph */}

      {/* Main Table */}
      <AllSymptoms rows={all} sendDataToParent={handleData}  />
    </div>
  )
}

export default SymptomsTables