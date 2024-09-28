import React, { useState, useEffect } from 'react'; // Import useEffect
import '../App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import TaskForm from './TaskForm'; // Import the TaskForm component
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([
    {
      assignedTo: 'User 1',
      status: 'In Progress',
      dueDate: '2024-09-30',
      priority: 'High',
      comments: 'Task details for User 1.',
    },
    {
      assignedTo: 'User 2',
      status: 'Completed',
      dueDate: '2024-09-28',
      priority: 'Medium',
      comments: 'Task details for User 2.',
    },
    {
      assignedTo: 'User 3',
      status: 'Pending',
      dueDate: '2024-10-05',
      priority: 'Low',
      comments: 'Task details for User 3.',
    },
    {
      assignedTo: 'User 4',
      status: 'In Progress',
      dueDate: '2024-09-29',
      priority: 'High',
      comments: 'Task details for User 4.',
    },
  ]); // Initialize tasks with fixed data
  const [showForm, setShowForm] = useState(false); // State to manage the visibility of TaskForm
  const [checkedItems, setCheckedItems] = useState(Array(4).fill(false));
  const [dropdownVisible, setDropdownVisible] = useState(-1); // State to track which dropdown is visible
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [filteredTasks, setFilteredTasks] = useState(tasks); // Initialize filteredTasks with all tasks
  const navigate = useNavigate();
  
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (Array.isArray(savedTasks)) {
      setTasks(savedTasks);
    }
  }, []);
  
  // Effect to initialize filteredTasks with all tasks
  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]); // Update filteredTasks whenever tasks change

  const handleSelectAll = (event) => {
    const newCheckedState = checkedItems.map(() => event.target.checked);
    setCheckedItems(newCheckedState);
  };

  const handleCheckboxChange = (index) => {
    const newCheckedState = [...checkedItems];
    newCheckedState[index] = !newCheckedState[index];
    setCheckedItems(newCheckedState);
  };

  const handleNewTaskClick = () => {
    setShowForm(true); // Show the form instead of navigating
  };

  const handleRefresh = () => {
    navigate('/');
  };

  const handleSaveTask = (taskDetails) => {
    setTasks([...tasks, taskDetails]); // Save the new task details
    setShowForm(false); // Hide the form after saving the task
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index]; // Get the task to edit
    navigate('/edit-task', { state: { task: taskToEdit, index } }); // Pass the task and index to edit-task page
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(newTasks);
  };

  const toggleDropdown = (index) => {
    setDropdownVisible(dropdownVisible === index ? -1 : index); // Toggle dropdown visibility
  };

  // Function to filter tasks based on the search term
  const handleSearch = () => {
    const filtered = tasks.filter((task) => {
      return (
        task && // Ensure task is not null or undefined
        typeof task.assignedTo === 'string' && // Check if assignedTo is a string
        (task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.dueDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.comments.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });

    // Navigate to SearchResults with filtered tasks
    navigate('/search-results', { state: { filteredTasks: filtered } });
  };

  return (
    <div className="task-list-container">
      {!showForm && (
        <div className="task-list-header">
          <div className="task-list-left">
            <div className="icon-container">
              <i className="bi bi-list-task" style={{ fontSize: '1.5rem', color: 'white' }}></i>
            </div>
            <div>
              <h2 className="task-title">Tasks</h2>
              <h4 className="task-subtitle">All Tasks</h4>
            </div>
          </div>

          <div className="task-list-right">
            <table className="task-btn-table">
              <tbody>
                <tr>
                  <td>
                    <button className="btn btn-yellow-orange new-task-btn" onClick={handleNewTaskClick}>New Task</button>
                  </td>
                  <td>
                    <button className="btn btn-yellow-orange refresh-btn" onClick={handleRefresh}>Refresh</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Search" 
                className="search-input" 
                value={searchTerm} // Control the input with searchTerm
                onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on change
              />
              <button 
                className="btn search-btn" 
                onClick={handleSearch} // Trigger search on button click
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {showForm ? (
        <TaskForm onSave={handleSaveTask} /> // Show TaskForm when showForm is true
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={checkedItems.every(Boolean)}
                />
              </th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                task && ( // Check that task is not null or undefined
                  <tr key={index}>
                    <td className="centered-checkbox">
                      <input
                        type="checkbox"
                        checked={checkedItems[index] || false}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </td>
                    <td>
                      <a href={`#${task.assignedTo}`} className="user-link">{task.assignedTo}</a>
                    </td>
                    <td>{task.status}</td>
                    <td>{task.dueDate}</td>
                    <td>{task.priority}</td>
                    <td>
                      <div className="comments-cell" style={{ position: 'relative' }}>
                        {task.comments}
                        <button 
                          className="dropdown-toggle" 
                          onClick={() => toggleDropdown(index)} 
                          aria-expanded={dropdownVisible === index}
                          style={{ float: 'right' }} 
                        >
                          <i className="bi bi-chevron-down"></i>
                        </button>
                        {dropdownVisible === index && (
                          <div className="dropdown-menu" style={{ position: 'absolute', right: 0, zIndex: 1 }}>
                            <button onClick={() => handleEditTask(index)} className="dropdown-item">Edit</button>
                            <button onClick={() => handleDeleteTask(index)} className="dropdown-item">Delete</button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              ))
            ) : (
              <tr>
                <td colSpan="6">No tasks available</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="6" className="pagination-footer">
                <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div className="pagination-links">
                    <a href="#first" className="pagination-link">First</a>
                    <a href="#previous" className="pagination-link">Previous</a>
                    <span className="pagination-link">1</span>
                    <a href="#next" className="pagination-link">Next</a>
                    <a href="#last" className="pagination-link">Last</a>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default TaskList;
