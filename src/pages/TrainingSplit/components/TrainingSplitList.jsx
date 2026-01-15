import TrainingSplitItem from "./TrainingSplitItem"

export default function TrainingSplitList({trainingSplits, handleEditTrainingSplit}) {
  return (
    <TrainingSplitItem trainingSplits={trainingSplits} handleEditTrainingSplit={handleEditTrainingSplit}/>
  )
}