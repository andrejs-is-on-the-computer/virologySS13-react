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