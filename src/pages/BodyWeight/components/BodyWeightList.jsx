import BodyWeightItem from "./BodyWeightItem"


export default function BodyWeightList({bodyWeights}) {

  const newArray = [...bodyWeights].sort((a, b) =>  {
    return new Date(b.date) - new Date(a.date)
  })

  return (
    <BodyWeightItem bodyWeights={newArray}/>
  )
}