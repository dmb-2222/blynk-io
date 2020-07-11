import React, { useState, useEffect} from "react";
import ToDo from "./ToDo";
import Comments from "./Comments";
import "./App.css";
function App() {
  const [id, setId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [sumComments, setSumComments] = useState([]);
  const [lengthComments, setLengthComments] = useState(null);

  const getId = (id) => {
    setId(id);
  };
  const handleDeleteId = (delId) => {
    setDeleteId(delId);
  };

useEffect(()=>{
  
})
  const handleCalcComments = (objectSumComments, incomeLengthComments) => {
    if (incomeLengthComments !== lengthComments) {
      // const arrSumComments= [objectSumComments]
      // console.log('arrSumComments', arrSumComments);
      setLengthComments(incomeLengthComments);
      setSumComments(objectSumComments);
    }
  };

  return (
    <div className="App">
      <ToDo
        getId={getId}
        handleDeleteId={handleDeleteId}
        sumComments={sumComments}
      />
      <Comments id={id} deleteId={deleteId} calcComments={handleCalcComments} />
    </div>
  );
}

export default App;
