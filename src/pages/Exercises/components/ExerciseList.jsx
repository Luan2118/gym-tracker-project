import ExerciseItem from "./ExerciseItem"

export default function  ExerciseList({filteredExercises}) {
  return (
    <ExerciseItem filteredExercises={filteredExercises}/>
  )
}