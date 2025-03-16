import React from 'react';
import axios from 'axios';

const TaskItem = ({ goalId, task, fetchGoals }) => {
    
  const updateTaskStatus = async () => {
    
    const newStatus = task.status === 'unfinished' ? 'completed' : 'unfinished';
    await axios.put(`/updateTask/${goalId,task._id}`, { status: newStatus });
    fetchGoals();
  };

  return (
    <li>
      {task.description} - {task.status}
      <button onClick={updateTaskStatus}>
        Mark as {task.status === 'unfinished' ? 'Completed' : 'Unfinished'}
      </button>
    </li>
  );
};

export default TaskItem;