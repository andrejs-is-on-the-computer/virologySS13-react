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

{/* <table className='w-full table-fixed'>
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
              /* EMPTY ROWS 
              {[...Array(6 - isSelected.length)].map((empty, i) => (
                <tr key={`empty-${i}`} className='text-center [&>*]:border-[1px] [&>*]:border-dotted [&>*]:border-gray-400 even:bg-gray-50 odd:bg-white'><td>---</td><td>---</td><td>---</td><td>---</td><td>---</td><td>---</td><td>---</td><td>---</td><td>---</td></tr>
              ))}
          </tbody>
            /* Total
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
              <td>---</td> 
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
        </table> */}