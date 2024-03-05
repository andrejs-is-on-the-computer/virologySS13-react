import React, { useState, useEffect, useCallback } from 'react'

import { SYMPTOMS } from '../assets/symptoms'
import Symptom from './Symptom'

import SelectedSymptoms from './SelectedSymptoms';
import SummedScores from './SummedScores';

import ScoreChart from './ScoreChart';

import { DataGrid, useGridApiRef } from '@mui/x-data-grid';

//
import { darken, lighten, styled } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/system';

//
import { Alert, Box, IconButton, Collapse, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const table_headers = ["Symptom", "Stealth", "Resistance", "Stage Speed", "Transmission", "Level", "Effect", "Required Chemical", "Threshold"];
const short_headers = ["STLTH", "RES", "STSP", "TRAN", "LEVEL", "THRSH"];

const columns = [
  {
    headerName: "Symptom",
    field: "symptom",
    flex: 0.8,
    headerAlign: 'center',
    headerClassName: 'text-white font-bold bg-slate-800 uppercase'
  },
  {
    headerName: "Stealth",
    field: "stealth",
    flex: 0.3,
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'text-white font-bold bg-slate-800 uppercase'
  },
  {
    headerName: "Resistance",
    field: "resistance",
    flex: 0.3,
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'text-white font-bold bg-slate-800 uppercase'
  },
  {
    headerName: "Stage Speed",
    field: "stage_speed",
    flex: 0.3,
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'text-white font-bold bg-slate-800 uppercase'
  },
  {
    headerName: "Transmission",
    field: "transmission",
    flex: 0.3,
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'text-white font-bold bg-slate-800 uppercase'
  },
  {
    headerName: "Level",
    field: "level",
    flex: 0.3,
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'text-white font-bold bg-slate-800 uppercase'
  },
  {
    headerName: "Effect",
    field: "effect",
    sortable: false,
    flex: 1.2,
    headerAlign: 'center',
    headerClassName: 'text-white font-bold bg-slate-800 uppercase'
  },
  {
    headerName: "Required Chemical",
    field: "required_chemical",
    sortable: false,
    flex: 0.5,
    headerAlign: 'center',
    headerClassName: 'text-white font-bold bg-slate-800 uppercase',
    renderCell: (params) => {
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
    flex: 0.4,
    headerAlign: 'center',
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

const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});


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

  // DATA GRID
  const apiRef = useGridApiRef();
  const [open, setOpen] = useState(true);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);


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
    
    console.log('handlin', symptom.row);

    if (symptom.row.selected){
    // Remove Symptom
      symptom.row.selected = false;
      setIsSelected(isSelected.filter(a => a.id !== symptom.row.id));
      setScores({
        ...scores,
        stealth_s: scores.stealth_s - symptom.row.stealth,
        resistance_s: scores.resistance_s - symptom.row.resistance,
        stage_speed_s: scores.stage_speed_s - symptom.row.stage_speed,
        transmission_s: scores.transmission_s - symptom.row.transmission,
        level_s: scores.level_s - symptom.level,
      });
      setIsThresholds(isThresholds.filter(a => a.id !== `${symptom.row.id}thresh`)); 

    } else if (rowSelectionModel.length <= 6 || isSelected.length <= 6) {
      // Add Symptom
      symptom.row.selected = true;
      setIsSelected([...isSelected, symptom.row]);
      setScores({
        ...scores,
        stealth_s: scores.stealth_s + symptom.row.stealth,
        resistance_s: scores.resistance_s + symptom.row.resistance,
        stage_speed_s: scores.stage_speed_s + symptom.row.stage_speed,
        transmission_s: scores.transmission_s + symptom.row.transmission,
        level_s: scores.level_s + symptom.row.level
      });
      const updateThresholds = symptom.row.threshold.map((t) => {
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

    } else {
      // No room, remove 1
    }
    // Update thresholds

    // Update scores
  }

  const isRowSelectable = useCallback(
    (params) => {
      if (rowSelectionModel.includes(params.id)) return true;
      if (rowSelectionModel.length >= 6) return false;
      return true;
    }
  );

  useEffect(() => {
    let vector = scores.transmission_s > 10 ? 'AIRBORNE' : scores.transmission_s > 6 ? 'SKIN CONTACT' : scores.transmission_s > 2 ? 'FLUID' : 'BLOOD';
    setTransMissionVector(vector);
  });

  return (
    <div>

      {/* SELECTED SYMPTOMS TABLE */}
      <div className='sticky top-0 z-10 w-full max-h-screen'>
      <DataGrid 
          rows={isSelected}
          columns={columns}
          // checkboxSelection
          hideFooter
          rowHeight={100}
          // getRowHeight={() => 'auto'}
          // onRowSelectionModelChange={item => {
          //   handleClick(item);
          // }}
          sx={{
            "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
              display: "none"
            },
            bgcolor: '#fff',
            color: '#000000'
          }}
        />
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
      {/* <Box sx={{ width: '100%' }}>
                <Collapse in={open}>
                  <Alert
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    Click the close icon to see the Collapse transition in action!
                  </Alert>
                </Collapse>
                <Button
                  disabled={open}
                  variant="outlined"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Re-open
                </Button>
      </Box> */}
        <DataGrid 
          rows={allSymptoms}
          columns={columns}
          // checkboxSelection
          hideFooter
          // getRowHeight={() => 'auto'}
          apiRef={apiRef}
          isRowSelectable={isRowSelectable}
          onRowSelectionModelChange={setRowSelectionModel}
          rowSelectionModel={rowSelectionModel}
          onRowClick={handleClick}
          sx={{
            '.MuiDataGrid-columnSeparator': {
              display: 'none',
            },
            '&.MuiDataGrid-root': {
              border: 'none',
            },
            
            '&.Mui-selected' : {
              backgroundColor: '#5d6d7e',
              color: '#fff',
            },
            "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
              display: "none",
              backgroundColor: '#173A5E',
            }
          }}
          
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