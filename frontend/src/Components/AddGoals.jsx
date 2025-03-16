import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import toast from 'react-hot-toast';
import '../css/goalForm.css'

const GoalForm = ({ fetchGoals }) => {
    const {user} = useContext(UserContext)

    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
  
    const addTask = () => {
      if (!title || !taskInput)  
      {
        toast.error('Please fill the required field')
      }
      if (taskInput.trim()) {
        
        setTasks([...tasks, { description: taskInput }]);
        setTaskInput('');
        toast.success('Task Added Successfully, Add a new one')
      }
    };
  
    const submitGoal = async () => {
        try {
            if (!title)  
                {
                  toast.error('Please fill the required field')
                }

            if (title.trim() && tasks.length > 0) {
                await axios.post('/addGoals', { 
                    userId: user.userId,
                    title, 
                    tasks });
                
                toast.success('Goals Added Successfully')
                setTitle('');
                setTasks([]);
                fetchGoals();
            }
        } catch {
            console.log(error)
            toast.error('Failed to add goals')
        }
      
    };
  
    return (
      <div className="goal-form-container">
          <form>
              <h2>Create your goals</h2> 
              <input
                  type="text"
                  placeholder="Goal Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
              />
              <input
                  type="text"
                  placeholder="Add Task"
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
              />
              <div className="goal-form-buttons">
                  <button type="button" onClick={addTask}>Add Task</button>
                  <button type="button" onClick={submitGoal}>Create Goal</button>
              </div>
          </form>
      </div>
    );
  };

export default GoalForm;