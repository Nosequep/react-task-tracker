import Tasks from "./Tasks";
import AddTask from "./AddTask";

const MainContainer = ({showAddTask, onAdd, onDelete, onToggle, tasks}) => {
  return (
    <>
        {showAddTask && <AddTask onAdd={onAdd}/>}
        {tasks.length > 0 ? 
            (<Tasks tasks={tasks}
            onDelete={onDelete}
            onToggle={onToggle}/>) : (<p>Not task to show</p>)}
    </>
  )
}

export default MainContainer