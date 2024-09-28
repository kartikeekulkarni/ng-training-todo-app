import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../App.css'; // Assuming you have this file for custom styles

const TaskForm = ({ onSave }) => {
  const [taskDetails, setTaskDetails] = useState({
    assignedTo: '',
    status: 'Completed',
    dueDate: '',
    priority: 'Low',
    comments: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSave prop with the new task details
    onSave(taskDetails);
    // Reset form
    setTaskDetails({ assignedTo: '', status: '', dueDate: '', priority: '', comments: '' });
    navigate('/'); // Navigate back to the home page after saving
  };

  const handleBack = () => {
    navigate('/'); // Navigate back to the home page
  };

  return (
    <div className="task-form-container">
      <button className="btn btn-secondary" onClick={handleBack}>Back</button> {/* Back button */}
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label>Assigned To:</label>
          <input
            type="text"
            name="assignedTo"
            value={taskDetails.assignedTo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select name="status" value={taskDetails.status} onChange={handleChange}>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={taskDetails.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Priority:</label>
          <select name="priority" value={taskDetails.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Comments:</label>
          <textarea
            name="comments"
            value={taskDetails.comments}
            onChange={handleChange}
            rows="4"
          />
        </div>
        <button type="submit" className="btn btn-primary">Save Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
