import Header from './components/Header';
import Footer from "./components/Footer";
import About from "./components/About";
import MainContainer from './components/MainContainer';

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useState, useEffect } from 'react';


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const[tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, [])

  const fetchTasks = async () =>{ 
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  }

  const fetchTask = async (id) =>{ 
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }

  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks",{
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    const data = await res.json();
    setTasks([...tasks, data]);
    /*
    const id = Math.floor(Math.random() * 1000) + 1;
    const newTask = {id, ...task}
    setTasks([...tasks, newTask]);
    */
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, 
      {method: "DELETE"});
    setTasks(tasks.filter((t) => t.id !== id));
  }

  const toggleReminder = async (id) =>{
    const taskToToggle = await fetchTask(id);
    const updTask = {...taskToToggle, reminder:  !taskToToggle.reminder};

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    });

    const data = await res.json();

    setTasks(tasks.map((t) => 
      t.id === id ? {...t, reminder:data.reminder} : t))
  }

  return (
    <Router>
      <div className="base-container">
        <Header onAdd={()=> setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        <Routes>
          <Route path="/" element={
            <MainContainer 
              onAdd={addTask} 
              onDelete={deleteTask} 
              onToggle={toggleReminder} 
              showAddTask={showAddTask} 
              tasks={tasks}/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
