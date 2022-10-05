import React, { useState } from "react";
import Button from "../button/Button";
import Input from "../input/Input";
import TextArea from "../input/TextArea";
import Card from "../card/Card";

const initialFormState = {
  title: "",
  description: "",
};

const EditTodoForm = (props) => {
  const [formData, setFormData] = useState(props.initialValues);

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
      id: formData.id,
      title: formData.title,
      description: formData.description,
      completed: formData.completed,
    };
    if (props.onEditSubmit) {
      props.onEditSubmit(todoItem);
    }
    clearForm();
  };
  return (
    <Card>
      <h2>Edit Todo</h2>
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
        <Button type="submit">Edit</Button>
      </form>
    </Card>
  );
};

export default EditTodoForm;
