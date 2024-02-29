import React, { useState, useEffect } from 'react'

import { SYMPTOMS } from '../assets/symptoms'
import Symptom from './Symptom'

import SelectedSymptoms from './SelectedSymptoms';
import SummedScores from './SummedScores';

import ScoreChart from './ScoreChart';

import { DataGrid } from '@mui/x-data-grid';


const table_headers = ["Symptom", "Stealth", "Resistance", "Stage Speed", "Transmission", "Level", "Effect", "Required Chemical", "Threshold"];
const short_headers = ["STLTH", "RES", "STSP", "TRAN", "LEVEL", "THRSH"];

const columns = [
  {
    headerName: "Symptom",
    field: "symptom",
    flex: 0.8,
    headerClassName: 'text-white font-bold bg-slate-800 uppercase'
  },
  {
    headerName: "Stealth",
    field: "stealth",
    flex: 0.3,
    headerClassName: 'text-white font-bold bg-slate-800 uppercase'
  },
  {
    headerName: "Resistance",
    field: "resistance",
    flex: 0.3,
    headerClassName: 'text-white font-bold bg-slate-800 uppercase'
  },
  {
    headerName: "Stage Speed",
    field: "stage_speed",
    flex: 0.3,
    headerClassName: 'text-white font-bold bg-slate-800 uppercase'
  },
  {
    headerName: "Transmission",
    field: "transmission",
    flex: 0.3,
    headerClassName: 'text-white font-bold bg-slate-800 uppercase'
  },
  {
    headerName: "Level",
    field: "level",
    flex: 0.3,
    headerClassName: 'text-white font-bold bg-slate-800 uppercase'
  },
  {
    headerName: "Effect",
    field: "effect",
    sortable: false,
    flex: 1,
    headerClassName: 'text-white font-bold bg-slate-800 uppercase'
  },
  {
    headerName: "Required Chemical",
    field: "required_chemical",
    sortable: false,
    flex: 0.5,
    headerClassName: 'text-white font-bold bg-slate-800 uppercase',
    renderCell: (params) => {
      console.log('params chem', params);
      return (<ul>
        {
          params.row.required_chemical.map((chem, chIndex) => (
            <li key={chIndex+"_chem_li_"+chem.name}>
            -<a className='font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline' 
            target="_blank" 
            href={chem.link}
            key={chIndex+"_chemical_"+chem.name}
            >
              {chem.name} 
            </a>
          </li>
          ))
        }
      </ul>)
    }
  },
  {
    headerName: "Threshold",
    field: "threshold",
    sortable: false,
    flex: 0.5,
    headerClassName: 'text-white font-bold bg-slate-800 uppercase',
    renderCell: (params) => {
      return (<ul>
        {
          params.row.threshold.map((t, tIndex) => {
            return <li key={tIndex+"_thresh_list_"+t.name}>
              - <span title={t.title} key={tIndex+"_allTID_"+t.name}>
                {t.name}: {t.value}
              </span>
            </li>
          })
        }
      </ul>)
    }
  }
];


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
    // Add Symptom

    // Remove Symptom

    // Update thresholds

    // Update scores
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
                  <Symptom key={`selected-${symptom.id}`} {...symptom} />
                </tr>
              ))}
              {/* EMPTY ROWS */}
              {[...Array(6 - isSelected.length)].map((empty, i) => (
                <tr key={`empty-${i}`} className='text-center [&>*]:border-[1px] [&>*]:border-dotted [&>*]:border-gray-400 even:bg-gray-50 odd:bg-white'><td>---</td><td>---</td><td>---</td><td>---</td><td>---</td><td>---</td><td>---</td><td>---</td><td>---</td></tr>
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

      <div>
        <DataGrid 
          rows={allSymptoms}
          columns={columns}
          checkboxSelection
          hideFooter
          getRowHeight={() => 'auto'}
          onRowSelectionModelChange={item => console.log('selecting', allSymptoms[item])}
          sx={{
            "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
              display: "none"
            }}}
        />
      </div>
      {/* <div className=''>
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
                <Symptom className="[&>*]:border-[1px] [&>*]:border-dotted [&>*]:border-gray-400" key={`symp-${symptom.id}`} {...symptom} />
              </tr>))}
          </tbody>
        </table>
      </div> */}

    </div>
  )
}

export default SymptomsTables