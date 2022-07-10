import React, { useState } from "react";
import Button from "../button/Button";
import Input from "../input/Input";
import TextArea from "../input/TextArea";
import Card from "../card/Card";

const initialFormState = {
  title: "",
  description: "",
};

const AddTodoForm = (props) => {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const clearForm = () => {
    setFormData(initialFormState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.title.trim() && !formData.description.trim()) {
      return;
    }
    const todoItem = {
      title: formData.title,
      description: formData.description,
      completed: false,
    };
    if (props.onAddSubmit) {
      props.onAddSubmit(todoItem);
    }
    clearForm();
  };
  return (
    <Card>
      <h2>Create Todo</h2>
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          type="text"
        />
        <TextArea
          value={formData.description}
          name="description"
          onChange={handleChange}
          placeholder="Description"
        />
        <Button type="submit">Create</Button>
      </form>
    </Card>
  );
};

export default AddTodoForm;
