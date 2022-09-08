import { useState } from "react";
import TaskForm from "../task-form/TaskForm";
import TaskItem from "../task-item/TaskItem";

function TaskList() {
  const [tasks, setTasks] = useState([{ user: 'carlos', description: 'Patata programing', mode: 'secondary' }]);
  const handleTaskCreated = (task) => {
    setTasks((tasks) => {
      return [
        ...tasks,
        task
      ]
    })
  }

  const handleDeleteTask = (description) => {
    setTasks(tasks => [...tasks].filter(task => task.description !== description))
  }

  return (
    <>
      <TaskForm className="mb-3" onTaskCreated={handleTaskCreated} inputInconClassName="text-info" />
      <ul className="list-group">
        {tasks.map((task) => (
          <TaskItem key={task.description} {...task} onDeletedTask={handleDeleteTask} />
        ))}
      </ul>
    </>
  )
}

export default TaskList;