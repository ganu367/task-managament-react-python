import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskView = ({ tasks, handleEdit, handleDelete }) => {
  return (
    <div className="container mt-4">
      <h2
        style={{
          textAlign: "center",
          backgroundColor: "#1565B3",
          color: "white",
          fontSize: "2.5rem",
          padding: "0.5rem",
        }}
      >
        Task List
      </h2>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.title}</td>
              <td>{task.desc}</td>
              <td>{task.due_date}</td>
              <td>
                <select className="form-control" value={task.priorities} disabled>
                  <option value="high" style={{ background: task.priorities === 'high' ? 'red' : task.priorities === 'medium' ? 'lightgreen' : 'orange' }}>
                    High
                  </option>
                  <option value="medium" style={{ background: task.priorities === 'medium' ? 'lightgreen' : 'orange' }}>
                    Medium
                  </option>
                  <option value="low" style={{ background: 'yellow' }}>
                    Low
                  </option>
                </select>
              </td>
              <td>
                <a href="#" onClick={() => handleEdit(task.id)} className="btn btn-primary">
                  Edit
                </a>
                <a href="#" onClick={() => handleDelete(task.id)} className="btn btn-danger">
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskView;
