import React from 'react'

const SelectedSymptoms = ({symptom, stealth, resistance, stage_speed, transmission, level, effect, required_chemical, threshold, id}) => {
  var width = "10px";
  return (
    <>
      <td className='p-1 font-bold max-w-28 border-[1px] border-dotted border-gray-400'>
        {symptom}
      </td>

      <td className={`p-1 w-[${width}] text-center border-[1px] border-dotted border-gray-400`}>
        {stealth}
      </td>

      <td className={`p-1 w-[${width}] text-center border-[1px] border-dotted border-gray-400`}>
        {resistance}
      </td>

      <td className={`p-1 w-[${width}] text-center border-[1px] border-dotted border-gray-400`}>
        {stage_speed}
      </td>

      <td className={`p-1 w-[${width}] text-center border-[1px] border-dotted border-gray-400`}>
        {transmission}
      </td>

      <td className={`p-1 w-[${width}] text-center border-[1px] border-dotted border-gray-400`}>
        {level}
      </td>

      <td className='p-1 border-[1px] border-dotted max-w-40 border-gray-400'>
        {effect}
      </td>

      <td className='p-1 border-[1px] border-dotted border-gray-400'>
        {required_chemical.map((x, i) => (
          <ul>
            <li>
              -<a className='font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline' 
              target="_blank" 
              href={x.link}
              key={i+"_chemical_"+x.name}
              >
                {x.name} 
              </a>
            </li>
          </ul>
        ))}
      </td>

      <td className='truncate text-wrap border-[1px] border-dotted border-gray-400'>
        {threshold.map((x, i) => (
          <ul>
            -<span  title={x.title} key={i+"_threshold_"+x.name}>
              {x.name}
            </span>
          </ul>
        ))}
      </td>
    </>
  )
}

export default SelectedSymptoms