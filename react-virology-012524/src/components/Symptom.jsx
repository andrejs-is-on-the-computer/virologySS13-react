import React from 'react'

const Symptom = ({symptom, stealth, resistance, stage_speed, transmission, level, effect, required_chemical, threshold, id}) => {

  return (
    <>
      <td className='p-2 font-bold'>
        {symptom}
      </td>

      <td className='p-2 min-w-[54px]'>
        {stealth}
      </td>

      <td className='p-2 min-w-[54px]'>
        {resistance}
      </td>

      <td className='p-2 min-w-[54px]'>
        {stage_speed}
      </td>

      <td className='p-2 min-w-[54px]'>
        {transmission}
      </td>

      <td className='p-2 min-w-[54px]'>
        {level}
      </td>

      <td className='p-2'>
        {effect}
      </td>

      <td className='p-2'>
        {required_chemical.map((x, i) => (
          <ul>
            <li>
              - <a className='font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline' 
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

      <td className='truncate text-wrap'>
        {threshold.map((x, i) => (
          <ul>
            - <span  title={x.title} key={i+"_threshold_"+x.name}>
              {x.name}
            </span>
          </ul>
        ))}
      </td>
    </>
  )
}

export default Symptom