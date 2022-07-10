import React, { useState } from "react";
import "./TodoItem.css";
import Checkbox from "../checkbox/CheckBox";

const TodoItem = (props) => {
  const handleCheckboxChange = (value, id) => {
    /*
      This function is triggered when the checkbox is ticked,
      
    */
    if (props.onCheckboxClick) {
      props.onCheckboxClick(value, props.data.id);
    }
    console.log(value);
  };

  const onDelete = () => {
    if (props.onDelete) {
      props.onDelete(props.data.id);
    }
  };

  const onEdit = () => {
    if (props.onEdit) {
      props.onEdit(props.data.id);
    }
  };

  return (
    <div className={`todo-item ${props.data.completed && "todo-completed"}`}>
      <div className="todo-item-header">
        <div className="title-area">
          <Checkbox
            checked={!!props.data.completed}
            onChange={handleCheckboxChange}
          />

          <h4>{props.data.title}</h4>
        </div>
        <div>
          <i onClick={onEdit} className="fa fa-pencil" aria-hidden="true"></i>
          <i onClick={onDelete} className="fa fa-trash" aria-hidden="true"></i>
        </div>
      </div>

      <div className="separator"></div>

      <p>{props.data.description}</p>
    </div>
  );
};

export default TodoItem;
