import TrainingSplitItem from "./TrainingSplitItem"

export default function TrainingSplitList({trainingSplits, editTrainingSplit, deleteTrainingSplit}) {
  return (
    <TrainingSplitItem trainingSplits={trainingSplits} handleEditTrainingSplit={editTrainingSplit} deleteTrainingSplit={deleteTrainingSplit}/>
  )
}