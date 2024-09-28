import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const EditTask = ({ onSave }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { task, index } = location.state;

  const [assignedTo, setAssignedTo] = useState(task.assignedTo);
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [priority, setPriority] = useState(task.priority);
  const [comments, setComments] = useState(task.comments);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { assignedTo, status, dueDate, priority, comments };

    // Update tasks in local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index] = updatedTask; // Update the specific task
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated tasks

    navigate('/'); // Navigate back to the task list
  };

  const handleBack = () => {
    navigate('/'); // Navigate back to the task list
  };

  return (
    <div className="edit-task-container">
      <button className="btn btn-secondary" onClick={handleBack}>Back</button>
      <h2>Edit Task</h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Assigned To:</label>
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Priority:</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Comments:</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows="4"
          />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditTask;
