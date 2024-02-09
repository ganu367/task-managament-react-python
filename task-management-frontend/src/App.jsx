import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {Alert } from "react-bootstrap";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Section from "./components/Section";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TaskView from "./components/Taskview";
import axios from "axios";
import EditTask from "./components/EditTask";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showEditModal, setShowEditModal] = useState(false)

  const handleLoginClick = () => {
    setShowLogin(!showLogin);
    setShowSignup(false);
  };

  const handleSignupClick = () => {
    setShowSignup(!showSignup);
    setShowLogin(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/user/get-all-task",
          {
            headers: {
              accept: "application/json",
            },
          }
        );

        if (response.status === 200) {
          setTasks(response.data.tasks);
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = async (taskId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/user/get-task/${taskId}`,
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      if (response.status === 200) {
        setSelectedTask(response.data.tasks[0]);
        setShowEditModal(true); 
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      setErrorMessage(error);
      setSuccessMessage();
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/task/delete-task/${taskId}`,
        "",
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      if (response.status === 200) {
        setSuccessMessage("Task Successfully deleted");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else {
        setErrorMessage("Something went wrong");
        setSuccessMessage();
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(error);
        setSuccessMessage();
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar
          onLoginClick={handleLoginClick}
          onSignupClick={handleSignupClick}
        />
        {showLogin ? <Login /> : showSignup ? <Signup /> : <Section />}
        <TaskView
          tasks={tasks}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          successMessage={setSuccessMessage}
          errorMessage={setErrorMessage}
        />
        <EditTask
          showEditModal={showEditModal}
          selectedTask={selectedTask}
          handleCloseEditModal={() => setShowEditModal(false)}
        />
       {successMessage && <Alert variant="success" style={{textAlign:"center"}}>{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger" style={{textAlign:"center"}}>{errorMessage}</Alert>}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
