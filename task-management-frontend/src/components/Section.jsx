import React, { useState } from "react";
import "./Section.css";
import { Button } from 'react-bootstrap';
import Addtask from "./Addtask";

const Section = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAddTask = (newTask) => {
    console.log('New Task:', newTask);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section className="container hero-section mt-4">
      <h1>Welcome to Task Management</h1>
      <Button className="btn btn-primary mt-3" onClick={handleShowModal}>
        Add your Task
      </Button>
      <Addtask show={showModal} handleClose={handleCloseModal} handleAddTask={handleAddTask} />
    </section>
  );
};

export default Section;
