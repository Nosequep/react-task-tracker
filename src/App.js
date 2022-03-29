import Header from './components/Header'
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState } from 'react'

function App() {
  const[tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Doctor appointment',
        day: 'Feb 5th at 2:30pm',
        reminder: true
    },
    {
        id: 2,
        text: 'Doctore appointment',
        day: 'Feb 6th at 2:30pm',
        reminder: true
    },
    {
        id: 3,
        text: 'Doctora appointment',
        day: 'Feb 7th at 2:30pm',
        reminder: false
    }
  ]);

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id != id));
  }

  const toggleReminder = (id) =>{
    setTasks(tasks.map((t) => 
      t.id == id ? {...t, reminder:!t.reminder} : t))
  }

  return (
    <div className="base-container">
      <Header/>
      <AddTask/>
      {tasks.length > 0 ? 
        (<Tasks tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleReminder}/>) : (<p>Not task to show</p>)}
    </div>
  );
}

export default App;
