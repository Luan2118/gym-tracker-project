

export function getBestSet(exerciseId, setId, activeExIds, workoutHistory) {

  const filteredHisWorkoutDays = workoutHistory?.filter((w) => w.exercises.some(ex => activeExIds.has(ex.exerciseId)))

  
  let filteredExSets = []
  let bestWeightNum = 0;
  let bestRepsNum = 0;

  for (let i = 0; i < filteredHisWorkoutDays.length; i++) {
    const filteredExercises =
      filteredHisWorkoutDays[i]?.exercises?.find((hisEx) => hisEx.exerciseId === exerciseId)
        ?.sets?.find((filteredSet) => filteredSet.id === setId)

    if (filteredExercises) filteredExSets.push(filteredExercises)
  }

  filteredExSets.forEach((set) => {
    if (set.weight > bestWeightNum) {
      bestWeightNum = set.weight
    }
  })

  const filteredBestSet =
    filteredExSets.filter((set) => set.weight === bestWeightNum)


  filteredBestSet.forEach((set) => {
    if (set.reps > bestRepsNum) {
      bestRepsNum = set.reps
    }
  })

  return filteredBestSet.find((set) => set.reps === bestRepsNum)
}


export function getPrevSet(exerciseId, setId, lastWorkout) {

  const prevExercise = lastWorkout?.exercises?.find(hEx => hEx.exerciseId === exerciseId);
  return prevExercise?.sets?.find(s => s.id === setId);
}
