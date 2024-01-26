import React from 'react'

const Symptom = ({symptom, stealth, resistance, stage_speed, transmission, level, effect, required_chemical, threshold, id}) => {

  // MOVE THESE TO SYMPTOMS.JS //
  // var chemical_names = required_chemical.split(/<[^>]*>/g).filter((x) => x.length > 1);
  // var chemical_links = required_chemical.split('"').filter((x) => x[0] === "/").map((x) => "https://tgstation13.org" + x);
  // var chemicals = [];
  // for (var i = 0; i < chemical_names.length; i++){
  //   chemicals.push({"name" : chemical_names[i], "link" : chemical_links[i]});
  // }

  // var threshold_name = threshold.split(/<[^>]*>/g).filter((x) => x.length > 2);
  // var threshold_title = threshold.split('"').filter((x) => x[0].toUpperCase() !== x[0].toLowerCase());
  // var thresholds = [];
  // for (var i = 0; i < threshold_name.length; i++) {
  //   thresholds.push({"name" : threshold_name[i], "title" : threshold_title[i]})
  // }
  // -------------------------- //

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
        {effect}
      </td>
      <td>
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
        {/* {chemicals.map((x, i, row) => (
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
          ))} */}
      </td>
      <td className='truncate text-wrap'>
        {/* {threshold} */}
        {threshold.map((x, i) => (
          <ul>
            <span  title={x.title} key={i+"_threshold_"+x.name}>
              {x.name}
            </span>
          </ul>
        ))}
      </td>
    </>
  )
}

export default Symptom