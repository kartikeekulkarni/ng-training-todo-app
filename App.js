import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchResults from './components/SearchResults';
import EditTask from './components/EditTask';

function App() {
  const [tasks, setTasks] = useState([]);

  const handleSaveTask = (taskDetails) => {
    setTasks([...tasks, taskDetails]); // Save the new task details
  };

  const handleSaveChanges = (taskDetails) => {
    setTasks([...tasks, taskDetails]); // Save the new task details
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList tasks={tasks} />} />
        <Route path="/task-form" element={<TaskForm onSave={handleSaveTask} />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/edit-task" element={<EditTask onSave={handleSaveChanges} />} />
      </Routes>
    </Router>
  );
}

export default App;
