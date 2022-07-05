import React, { useState } from "react";
import "./TodoItem.css";
import Checkbox from "../checkbox/CheckBox";

const TodoItem = (props) => {
  const handleCheckboxChange = (value) => {
    console.log(value);
  };

  return (
    <div className={`todo-item ${props.completed && "todo-completed"}`}>
      <div className="todo-item-header">
        <div className="title-area">
          <Checkbox
            checked={!!props.completed}
            onChange={handleCheckboxChange}
          />

          <h4>Assignment 1</h4>
        </div>
        <div>
          <i className="fa fa-pencil" aria-hidden="true"></i>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </div>
      </div>

      <div className="separator"></div>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At id illo
        repellendus non maiores in pariatur aliquam iure fugit amet!
      </p>
    </div>
  );
};

export default TodoItem;
