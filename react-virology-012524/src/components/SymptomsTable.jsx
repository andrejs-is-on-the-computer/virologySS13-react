import React from 'react'
import { SYMPTOMS } from '../assets/symptoms'
// import Symptom from './Symptom'

const table_headers = ["Symptom", "Stealth", "Resistance", "Stage Speed", "Transmission", "Level", "Required Chemical", "Effect", "Threshold"];

const Symptom = ({symptom, stealth, resistance, stage_speed, transmission, level, required_chemical, threshold, id}) => {

  // console.log(symptom);
  return (
    <>
      <td>
        {symptom}
      </td>
      <td>
        {stealth}
      </td>
      <td>
        {resistance}
      </td>
      <td>
        {stage_speed}
      </td>
      <td>
        {transmission}
      </td>
      <td>
        {level}
      </td>
      <td>
        {required_chemical}
      </td>
      <td>
        {threshold}
      </td>
    </>
  )
}

const SymptomsTable = () => {
  return (
    <div>
      <table className='table-auto'>
        <thead>
          <tr>
            {table_headers.map((header) => <th>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {SYMPTOMS.map((symptom) => (
            <tr>
              {console.log(symptom)}
              <Symptom key={symptom.id} {...symptom} />
            </tr>))}
        </tbody>
      </table>
    </div>
  )
}

export default SymptomsTable