
function TaskItem({ description, className, mode, onDeletedTask }) {
  const handleDeleteTask = () => onDeletedTask(description);
  let modeCss;
  switch (mode) {
    case 'secondary':
      modeCss = 'bg-ligth';
      break;
    case 'danger':
      modeCss = 'bg-danger';
      break;
    case 'warning':
      modeCss = 'bg-warning';
      break;
    default:
      console.error(`Unknown mode ${mode}`)
      modeCss = 'bg-ligth';
  }
  return (
    <li className={`list-group-item d-flex align-items-center justify-content-between ${className} ${modeCss}`}>
      {description}
      <i className="fa fa-times text-danger" role="button" onClick={handleDeleteTask} />
    </li>
  );
}


TaskItem.defaultProps = {
  className: '',
  mode: 'secondary',
  onDeletedTask: () => {}
}

export default TaskItem;