import BodyWeightItem from "./BodyWeightItem"


export default function BodyWeightList({bodyWeights, deleteBodyWeight}) {

  

  return (
    <BodyWeightItem bodyWeights={bodyWeights} deleteBodyWeight={deleteBodyWeight}/>
  )
}