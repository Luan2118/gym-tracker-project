import ExerciseItem from "./ExerciseItem"

export default function  ExerciseList({filteredExercises, handleSelectExercise}) {
  return (
    <ExerciseItem filteredExercises={filteredExercises} handleSelectExercise={handleSelectExercise}/>
  )
}