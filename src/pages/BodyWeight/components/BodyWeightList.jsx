import BodyWeightItem from "./BodyWeightItem"


export default function BodyWeightList({bodyWeights, deleteBodyWeight, handleEditBodyWeight, editBodyWeightId, handleEditBwInput, editBodyWeightInputText, handleSaveBodyWeight}) {

  

  return (
    <BodyWeightItem bodyWeights={bodyWeights} deleteBodyWeight={deleteBodyWeight} handleEditBodyWeight={handleEditBodyWeight} editBodyWeightId={editBodyWeightId} handleEditBwInput={handleEditBwInput} editBodyWeightInputText={editBodyWeightInputText} handleSaveBodyWeight={handleSaveBodyWeight}/>
  )
}