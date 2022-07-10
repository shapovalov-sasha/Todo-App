import React, { useState } from "react";
import Card from "./components/card/Card";
import TodoItem from "./components/todo-item/TodoItem";
import Button from "./components/button/Button";
import AddTodoForm from "./components/form/AddTodoForm";
import EditTodoForm from "./components/form/EditTodoForm";
import Modal from "./components/modal/Modal";

import "./App.css";

const TODOS_MOCK = [
  {
    id: "1",
    title: "Todo 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At id illo repellendus non maiores in pariatur aliquam iure fugit amet!",
    completed: false,
  },
  {
    id: "2",
    title: "Todo 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit!",
    completed: false,
  },
  {
    id: "3",
    title: "Todo 3",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit!",
    completed: true,
  },
  {
    id: "4",
    title: "Todo 4",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit!",
    completed: true,
  },
];

function App() {
  const [todos, setTodos] = useState(TODOS_MOCK);
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);

  const activeTodos = todos.filter((item) => !item.completed);
  const completedTodos = todos.filter((item) => item.completed);

  const onModalClose = () => {
    setIsOpen(false);
    setEditMode(null);
  };

  const handleAddTodo = (data) => {
    const id = Math.random().toString(36).slice(2, 10);
    setTodos((prevState) => [
      ...prevState,
      {
        ...data,
        id,
      },
    ]);
    onModalClose();
  };

  const handleEditTodo = (data) => {
    setTodos((prevState) =>
      prevState.map((item) => {
        if (item.id === data.id) {
          return data;
        }
        return item;
      })
    );
    onModalClose();
  };

  const handleChekboxClick = (value, id) => {
    setTodos((prevState) =>
      prevState.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: value,
          };
        }
        return item;
      })
    );
  };

  const onDelete = (id) => {
    setTodos((prevState) => prevState.filter((item) => item.id !== id));
  };

  const onEdit = (id) => {
    const todoToEdit = todos.find((item) => item.id === id);
    setEditMode(todoToEdit);
    setIsOpen(true);
  };

  return (
    <div className="App">
      <div className="app-container">
        {/* 
            This is your Create Card component.
            Use this form to create todos
          */}
        <Modal isOpen={isOpen} onClose={onModalClose}>
          {editMode ? (
            <EditTodoForm
              initialValues={editMode}
              onEditSubmit={handleEditTodo}
            />
          ) : (
            <AddTodoForm onAddSubmit={handleAddTodo} />
          )}
        </Modal>
        {/* 
          My Todos
        */}
        <Card>
          <h1>My todos</h1>
          <Button onClick={() => setIsOpen(true)}>Add +</Button>
          <div className="list-container">
            {activeTodos.map((item) => (
              <TodoItem
                key={item.id}
                data={item}
                onCheckboxClick={handleChekboxClick}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>

          <div className="separator"></div>

          <h2>Completed</h2>
          <div className="list-container">
            {completedTodos.map((item) => (
              <TodoItem
                key={item.id}
                data={item}
                onCheckboxClick={handleChekboxClick}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
