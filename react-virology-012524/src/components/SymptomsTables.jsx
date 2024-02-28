import React, { useState, useEffect } from 'react'
import { SYMPTOMS } from '../assets/symptoms'
import Symptom from './Symptom'
import SelectedSymptoms from './SelectedSymptoms';
import SummedScores from './SummedScores';
import ScoreChart from './ScoreChart';
import PrimeTable from './PrimeTable';

const table_headers = ["Symptom", "Stealth", "Resistance", "Stage Speed", "Transmission", "Level", "Effect", "Required Chemical", "Threshold"];
const short_headers = ["STLTH", "RES", "STSP", "TRAN", "LEVEL", "THRSH"];


const SymptomsTables = () => {

  const [allSymptoms, setAllSymptoms] = useState(SYMPTOMS);
  const [isSelected, setIsSelected] = useState([]);
  const [visible, setVisible] = useState(true);
  const [isThresholds, setIsThresholds] = useState([]);
  const [scores, setScores] = useState({
    stealth_s: 0,
    resistance_s: 0,
    stage_speed_s: 0,
    transmission_s: 0,
    level_s: 0
  });
  const [transmissionVector, setTransMissionVector] = useState('BLOOD');

  function clearAll() {
    isSelected.map((symptom) => {
      symptom.selected = false;
    });
    setIsSelected([]);
    setIsThresholds([]);
    setScores({
      stealth_s: 0,
      resistance_s: 0,
      stage_speed_s: 0,
      transmission_s: 0,
      level_s: 0
    });
  }
 
  function handleClick(symptom) {
    // Removing Symptom //
    if (symptom.selected) {
      symptom.selected = false;
      setIsSelected(isSelected.filter(a => a.id !== symptom.id));
      setScores({
        ...scores,
        stealth_s: scores.stealth_s - symptom.stealth,
        resistance_s: scores.resistance_s - symptom.resistance,
        stage_speed_s: scores.stage_speed_s - symptom.stage_speed,
        transmission_s: scores.transmission_s - symptom.transmission,
        level_s: scores.level_s - symptom.level,
      });
      setIsThresholds(isThresholds.filter(a => a.id !== `${symptom.id}thresh`)); 
    } else if (isSelected.length < 6) {
      // Adding Symptom //
      symptom.selected = true;
      setIsSelected([...isSelected, symptom]);
      setScores({
        ...scores,
        stealth_s: scores.stealth_s + symptom.stealth,
        resistance_s: scores.resistance_s + symptom.resistance,
        stage_speed_s: scores.stage_speed_s + symptom.stage_speed,
        transmission_s: scores.transmission_s + symptom.transmission,
        level_s: scores.level_s + symptom.level
      });
      const updateThresholds = symptom.threshold.map((t) => {
        return {
          id: t.id,
          stat: t.symptom,
          name: t.name,
          value: t.value,
          title: t.title,
          fill: t.fill
        };
      });
      updateThresholds.push(...isThresholds);
      setIsThresholds(updateThresholds);
    }
  }

  useEffect(() => {
    let vector = scores.transmission_s > 10 ? 'AIRBORNE' : scores.transmission_s > 6 ? 'SKIN CONTACT' : scores.transmission_s > 2 ? 'FLUID' : 'BLOOD';
    setTransMissionVector(vector);
  });

  return (
    <div>

      {/* SELECTED SYMPTOMS TABLE */}
      <div className='sticky top-0 z-10 w-full max-h-screen'>
        <table className='w-full table-fixed'>
          <thead>
            <tr>
              {table_headers.map((header, i) => <th className='text-white bg-slate-800 uppercase border-r-[1px] border-b-[1px] border-dotted border-gray-400 text-sm' key={i+"_header"}>{header}</th>)}
            </tr>
          </thead>
          <tbody className={`overflow-x-hidden transition-all duration-150 ${visible ? '' : 'hidden'}`}>
              {isSelected.map((symptom) => (
                <tr className="even:bg-gray-50 odd:bg-white
                hover:bg-slate-900 hover:text-white duration-300"
                    key={symptom.id+"_symptom_row"}
                    onClick={() => handleClick(symptom)}
                    >
                  <Symptom key={symptom.id} {...symptom} />
                </tr>
              ))}
              {/* EMPTY ROWS */}
              {[...Array(6 - isSelected.length)].map((empty) => (
                <tr className='text-center [&>*]:border-[1px] [&>*]:border-dotted [&>*]:border-gray-400 even:bg-gray-50 odd:bg-white'><td>---</td><td>---</td><td>---</td><td>---</td><td>---</td><td>---</td><td>---</td><td>---</td><td>---</td></tr>
              ))}
          </tbody>
            {/* Totals */}
          <tfoot className='[&>*]:border-[1px] [&>*]:border-dotted [&>*]:border-gray-400 [&>*]:bg-slate-600
                          [&>*]:uppercase [&>*]:text-white [&>*]:font-bold [&>*]:text-center'>
            <tr className='[&>*]:border-[1px] [&>*]:border-dotted [&>*]:border-gray-400 [&>*]:bg-slate-600
                          [&>*]:uppercase [&>*]:text-white [&>*]:font-bold [&>*]:text-center'>
              <td className=''>TOTAL</td>
              <td className='text-center'>{scores.stealth_s}</td>
              <td className='text-center'>{scores.resistance_s}</td>
              <td className='text-center'>{scores.stage_speed_s}</td>
              <td className='text-center'>{scores.transmission_s}</td>
              <td className='text-center'>{scores.level_s}</td>

              <td>---</td>
              <td>---</td>
              <td
                rowSpan={2} 
                className='hover:bg-blue-600 duration-150 cursor-pointer'
                onClick={() => clearAll()}
              >
                <div>CLEAR ALL</div>
              </td>
              {/* <td>{transmissionVector}</td>
              <td>Potential Cures</td>
              <td>---</td> */}
            </tr>
            <tr className='[&>*]:text-xs
                          [&>*]:border-[1px] [&>*]:border-dotted [&>*]:border-gray-400 [&>*]:bg-slate-800
                          [&>*]:uppercase [&>*]:text-white [&>*]:font-bold [&>*]:text-center'>
              <td>{isSelected.length ? isSelected.length : 0} / 6</td>
              <td>{scores.stealth_s >= 2 ? "HIDDEN" : "NOT HIDDEN"}</td>
              <td>---</td>
              <td>{scores.stage_speed_s < 2 ? "2%" : `${scores.stage_speed_s}%`}</td>
              <td>{transmissionVector}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
        {/* Show / Hide Selected table */}
          <div
            className='h-[25px] rounded-b-xl text-center cursor-pointer
                    bg-blue-400 hover:bg-blue-600 duration-150 text-white font-bold'
            onClick={() => setVisible(visible => !visible)}
          >
            {visible ? "HIDE" : "SHOW"}
        </div>
      </div>
      
      {/* Bar Chart */}
      <div className='relative w-full h-[500px] pb-10 pr-10 mt-[25px]'>
        <ScoreChart amount={isSelected.length} {...scores} thresholds={isThresholds} />
      </div>

        {/* ALL SYMPTOMS TABLE */}

      <div className=''>
        <table className='w-full mb-[60px] table-fixed [&>*]:border-[1px] [&>*]:border-dotted [&>*]:border-gray-400'>
          <thead>
            <tr className='text-white bg-slate-800 uppercase'>
              {table_headers.map((header, i) => <th key={i+"_header"}>{header}</th>)}
            </tr>
          </thead>
          <tbody className='[&>*]:border-[1px] [&>*]:border-dotted [&>*]:border-gray-400'>
            {allSymptoms.map((symptom) => (
              <tr className={`${symptom.selected ? "bg-blue-300" : "even:bg-gray-50 odd:bg-white"}
              hover:bg-slate-900 hover:text-white duration-300 `} 
                  key={symptom.id+"_symptom_row"}
                  onClick={() => handleClick(symptom)}
                  >
                <Symptom className="[&>*]:border-[1px] [&>*]:border-dotted [&>*]:border-gray-400" key={symptom.id} {...symptom} />
              </tr>))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default SymptomsTables