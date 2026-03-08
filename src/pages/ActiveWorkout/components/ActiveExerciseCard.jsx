import styles from './ActiveExerciseCard.module.css'

export default function ActiveExerciseCard({ ex, activeExercises, workoutHistory, handleWeightSet, handleRepsSet }) {

  const activeExIds = new Set(activeExercises.map(e => e.id));

  function getBestSet(exerciseId, setId) {
    const filteredHisWorkoutDays = workoutHistory?.filter((w) => w.exercises.some(ex => activeExIds.has(ex.id)))


    let filteredExSets = []
    let bestWeightNum = 0;
    let bestRepsNum = 0;

    for (let i = 0; i < filteredHisWorkoutDays.length; i++) {
      const filteredExercises =
        filteredHisWorkoutDays[i]?.exercises?.find((hisEx) => hisEx.id === exerciseId)
          ?.sets?.find((filteredSet) => filteredSet.id === setId)


      filteredExSets.push(filteredExercises)
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



  const lastWorkout = [...workoutHistory]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .find(w => w.exercises?.some(ex => activeExIds.has(ex.id)));

  function getPrevSet(exerciseId, setId) {
    const prevExercise = lastWorkout?.exercises?.find(hEx => hEx.id === exerciseId);
    return prevExercise?.sets?.find(s => s.id === setId);
  }

  return (
    <div className={styles["active-workout-wrapper"]}>
      <div className={styles["active-workout-name-wrapper"]}>
        <img src={ex.icon} alt="" className={styles["active-workout-ex-icon"]} />
        <div className={styles["active-workout-ex-name"]}>{ex.exerciseName}</div>
      </div>

      <div>
        <div>Best set:</div>
        {ex.sets.map((set, index) => {

          const bestSet = getBestSet(ex.exerciseId, set.id)

          return (
            <div key={set.id} className={styles["active-workout-b-p-set-wrapper"]}>
              <div className={styles["active-workout-b-p-set"]}>Set {index + 1}:</div>
              {bestSet ? `${bestSet.weight} x ${bestSet.reps}` : "-"}
            </div>
          )
        })}
      </div>

      <div>
        <div>Previous set:</div>
        {ex.sets.map((set, index) => {
          const prevSet = getPrevSet(ex.exerciseId, set.id)
          return (
            <div key={set.id} className={styles["active-workout-b-p-set-wrapper"]}>
              <div className={styles["active-workout-b-p-set"]}>Set {index + 1}:</div>
              {prevSet ? `${prevSet.weight} x ${prevSet.reps}` : "-"}
            </div>
          )
        })}
      </div>

      <div className={styles["active-workout-set-wrapper"]}>
        <div>Current set :</div>
        {ex.sets.map((set, index) => {
          return (
            <div key={set.id} className={styles["active-workout-set-wrapper"]}>
              <fieldset className={styles["fieldset-wrapper"]}>
                <legend className={styles["sr-only"]}>Set {index + 1}:</legend>

                <div className={styles["set-text"]}>Set {index + 1}:</div>

                <div className={styles["active-workout-set-input-wrapper"]}>
                  <label htmlFor={`weight-${set.id}`} className={styles["sr-only"]}>Weight</label>
                  <input type="text" id={`weight-${set.id}`} className={styles["active-workout-weight-input"]} onChange={(e) => handleWeightSet(e, set.id, ex.exerciseId)} />
                  x
                  <label htmlFor={`reps-${set.id}`} className={styles["sr-only"]}>Reps</label>
                  <input type="text" id={`reps-${set.id}`} className={styles["active-workout-reps-input"]} onChange={(e) => handleRepsSet(e, set.id, ex.exerciseId)} />
                </div>
              </fieldset>
            </div>
          )
        })}
      </div>
    </div>
  )
}