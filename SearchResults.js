import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { filteredTasks } = location.state || { filteredTasks: [] };

  // State for managing checkbox selection
  const [checkedItems, setCheckedItems] = useState(Array(filteredTasks.length).fill(false));

  const handleCheckboxChange = (index) => {
    const newCheckedState = [...checkedItems];
    newCheckedState[index] = !newCheckedState[index];
    setCheckedItems(newCheckedState);
  };

  const handleBackButtonClick = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="search-results-container">
      <div className="search-results-header">
        <h2>Search Results</h2>
        <button onClick={handleBackButtonClick} className="btn btn-yellow-orange">
          Back
        </button>
      </div>
      {filteredTasks.length > 0 ? (
        <table className="task-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) => setCheckedItems(Array(filteredTasks.length).fill(e.target.checked))}
                  checked={checkedItems.every(Boolean)} // Check if all are checked
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
            {filteredTasks.map((task, index) => (
              <tr key={index}>
                <td className="centered-checkbox">
                  <input
                    type="checkbox"
                    checked={checkedItems[index] || false}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td>{task.assignedTo}</td>
                <td>{task.status}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>
                <td>{task.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
