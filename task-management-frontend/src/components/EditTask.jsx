import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const EditTask = ({
  showEditModal,
  handleCloseEditModal,
  selectedTask = {},
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("high");
  const [date, setDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setTitle(selectedTask.title || "");
    setDescription(selectedTask.desc || "");
    setPriority(selectedTask.priorities || "high");
    setDate(selectedTask.due_date || "");
  }, [selectedTask]);

  const onUpdateTask = async (taskId) => {
    console.log("taskId is is",taskId)
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      priority.trim() === ""
    ) {
      setErrorMessage("Fields can't be empty");
      setSuccessMessage("");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);

      return;
    }
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/user/update-task/${taskId}` ,
        {
          title: title,
          desc: description,
          due_date: date,
          priorities: priority,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Task updated successfully!");
        setErrorMessage("");
        handleCloseEditModal();
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        console.log("Something went wrong");
        setErrorMessage(response.detail);
        setSuccessMessage("");

        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error adding task:", error);
      setErrorMessage("Error adding task. Please try again.");
      setSuccessMessage("");

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <Modal show={showEditModal} onHide={handleCloseEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="priority">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Button variant="secondary" onClick={handleCloseEditModal}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onUpdateTask(selectedTask.id)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTask;
