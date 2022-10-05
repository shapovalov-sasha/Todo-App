import React, { useState } from "react";
import Card from "./components/card/Card";
import TodoItem from "./components/todo-item/TodoItem";
import Button from "./components/button/Button";
import AddTodoForm from "./components/form/AddTodoForm";
import EditTodoForm from "./components/form/EditTodoForm";
import Modal from "./components/modal/Modal";

import "./App.css";
import { useEffect } from "react";

const getStoredValuesFromLocalStorage = () => {
  try {
    const storedItems = localStorage.getItem("todos");

    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    return [];
  }
};

/*
  Todo Examople
   {
    id: string, 
    description: string,
    completed: bool
    title: string
   }
*/

function App() {
  const [todos, setTodos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);

  const activeTodos = todos.filter((item) => !item.completed);
  const completedTodos = todos.filter((item) => item.completed);

  const getTaskFromApi = async () => {
    let data = [];
    try {
      const response = await fetch("http://localhost:8000/todos", {
        method: "GET",
      });
      if (response.status === 200) data = await response.json();
    } catch (e) {
      console.log(e);
    }
    setTodos(data);
  };

  useEffect(() => {
    getTaskFromApi();
  }, []);

  useEffect(() => {
    // const todosToSave = JSON.stringify(todos);
    // localStorage.setItem("todos", todosToSave);
  }, [todos]);

  const onModalClose = () => {
    setIsOpen(false);
    setEditMode(null);
  };

  const saveTodosWithApi = async (data) => {
    await fetch("http://localhost:8000/todos", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  };

  const handleAddTodo = (data) => {
    const id = Math.random().toString(36).slice(2, 10);
    console.log({ data });
    saveTodosWithApi({
      ...data,
      id,
    });

    // setTodos((prevState) => [
    //   ...prevState,
    //   {
    //     ...data,
    //     id,
    //   },
    // ]);
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
    // setTodos((prevState) => prevState.filter((item) => item.id !== id));
  };

  const onEdit = (id) => {
    const todoToEdit = todos.find((item) => item.id === id);
    setEditMode(todoToEdit);
    setIsOpen(true);
  };

  return (
    <div className='App'>
      <div className='app-container'>
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
          <div className='list-container'>
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

          <div className='separator'></div>

          <h2>Completed</h2>
          <div className='list-container'>
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
