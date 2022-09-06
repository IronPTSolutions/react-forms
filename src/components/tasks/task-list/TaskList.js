import { useState } from "react";
import TaskForm from "../task-form/TaskForm";
import TaskItem from "../task-item/TaskItem";

function TaskList() {
  const [tasks, setTasks] = useState([{ description: 'Patata programing' }]);
  const handleTaskCreated = (task) => {
    setTasks((tasks) => {
      return [
        ...tasks,
        task
      ]
    })
  }
  return (
    <>
      <TaskForm className="mb-3" onTaskCreated={handleTaskCreated} />
      <ul className="list-group">
        {tasks.map((task) => (
          <TaskItem key={task.description} {...task} />
        ))}
      </ul>
    </>
  )
}

export default TaskList;