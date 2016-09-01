import React from "react";

const ToDo = (props) => 
    <div onClick={() => props.deleteToDo(props.objId)}>
      <p>{props.value}</p>
    </div>

export default ToDo;
