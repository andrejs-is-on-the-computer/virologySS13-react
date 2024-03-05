import React, { useState, useEffect } from 'react'
import AllSymptoms from './AllSymptoms'
import { SYMPTOMS } from '../assets/symptoms'

const SymptomsTables = () => {
  return (
    <div className='w-full'>
      {/* Selected Table */}

      {/* Graph */}

      {/* Main Table */}
      <AllSymptoms rows={SYMPTOMS} />
    </div>
  )
}

export default SymptomsTables