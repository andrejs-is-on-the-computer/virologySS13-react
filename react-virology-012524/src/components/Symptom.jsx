import React from 'react'

const Symptom = ({symptom, stealth, resistance, stage_speed, transmission, level, effect, required_chemical, threshold, id}) => {
  return (
    <>
      <td className='font-bold border-[1px] border-dotted border-gray-400'>
        {symptom}
      </td>

      <td className={`text-center border-[1px] border-dotted border-gray-400`}>
        {stealth}
      </td>

      <td className={`text-center border-[1px] border-dotted border-gray-400`}>
        {resistance}
      </td>

      <td className={`text-center border-[1px] border-dotted border-gray-400`}>
        {stage_speed}
      </td>

      <td className={`text-center border-[1px] border-dotted border-gray-400`}>
        {transmission}
      </td>

      <td className={`text-center border-[1px] border-dotted border-gray-400`}>
        {level}
      </td>

      <td className='max-w-[300px] border-[1px] border-dotted border-gray-400'>
        {effect}
      </td>

      <td className='border-[1px] border-dotted border-gray-400'>
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

      <td className='truncate border-[1px] border-dotted border-gray-400'>
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

export default Symptom