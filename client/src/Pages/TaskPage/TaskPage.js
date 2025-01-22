import React, { useState, useEffect } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Header from "../../Compontents/Header/Header";
import Footer from "../../Compontents/Footer/Footer";
import axios from "axios";
import TaskForm from "../../Compontents/TaskComponents/TaskFrom";
import TaskColumn from "../../Compontents/TaskComponents/TaskColunm";
import "./Task.css";

const API_URL = "https://task-manger-task.onrender.com/api/tasks";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Track popup visibility

  const handleOpenPopup = () => {
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(API_URL);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const response = await axios.post(API_URL, task);
      if (response.status === 201) setTasks([...tasks, response.data]);
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`${API_URL}/${taskId}`);
        setTasks(tasks.filter((task) => task._id !== taskId));
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      const response = await axios.patch(`${API_URL}/${taskId}`, { status });
      if (response.status === 200) {
        const updatedTask = response.data;
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
        );
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div>
      <div>
        <Header />
      </div>

      <DndProvider backend={HTML5Backend}>
        <div className="app">
          <div>
            <h1>Task Management</h1>
            <p>Drag and drog And Button Functionaly is there </p>
            <button className="create-task-button" onClick={handleOpenPopup}>
              Create Task
            </button>

            {/* Popup for creating a task */}
            {isPopupOpen && (
              <div className="popup-overlay">
                <div className="popup-content">
                  <h2 className="popup-content1">Create a New Task</h2>
                  <div className="button-container">
  <TaskForm addTask={addTask} closePopup={handleClosePopup} />
  <button style={{
    marginTop:"-25px",
    marginRight:"33px",
    float:"right"
  }} onClick={handleClosePopup}>Close</button>
</div>

                </div>
              </div>
            )}
          </div>

          <div className="task-columns">
            <TaskColumn
              title="Started"
              tasks={tasks.filter((task) => task.status === "Started")}
              updateTaskStatus={updateTaskStatus}
              deleteTask={deleteTask}
            />
            <TaskColumn
              title="Pending"
              tasks={tasks.filter((task) => task.status === "Pending")}
              updateTaskStatus={updateTaskStatus}
              deleteTask={deleteTask}
            />
            <TaskColumn
              title="Completed"
              tasks={tasks.filter((task) => task.status === "Completed")}
              updateTaskStatus={updateTaskStatus}
              deleteTask={deleteTask}
            />
          </div>
        </div>
      </DndProvider>
      <Footer />
    </div>
  );
};

export default App;
