import { useState } from "react";

const availableModes = ['danger', 'secondary', 'warning'];

const validations = {
  user: (value) => {
    let message;
    if (!value) {
      message = 'Username is required';
    }
    return message;
  },
  description: (value) => {
    let message;
    if (!value) {
      message = 'Task description is required';
    } else if (value.length < 3) {
      message = 'Task description needs at least 3 chars';
    }
    return message;
  },
  mode: (value) => {
    let message;
    if (!availableModes.includes(value)) {
      message = 'Please select task mode';
    }
    return message;
  }
}

const initialState = {
  task: {
    user: '',
    description: '',
    mode: ''
  },
  errors: {
    user: validations.user(''),
    description: validations.description(''),
    mode: validations.mode(''),
  },
  touch: {
    user: false,
    description: false,
    mode: false
  }
}

function TaskForm({ className, onTaskCreated, inputInconClassName }) {
  const [state, setState] = useState(initialState)

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState((state) => {
      return {
        ...state,
        task: {
          ...state.task,
          [name]: value
        },
        errors: {
          ...state.errors,
          [name]: validations[name] && validations[name](value)
        }
      }
    })
  }

  const handleBlur = (event) => {
    const { name } = event.target;

    setState((state) => {
      return {
        ...state,
        touch: {
          ...state.touch,
          [name]: true
        }
      }
    })
  }

  const isValid = () => !Object.keys(state.errors).some(error => state.errors[error]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isValid()) {
      const { task } = state;
      onTaskCreated(task);
      setState(initialState);
    }

    console.log(event);
  }

  const { task, errors, touch } = state;
  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="input-group mb-1">
        <span className="input-group-text"><i className={`fa fa-user fa-fw ${inputInconClassName}`} /></span>
        <input type="text" className={`form-control ${errors.user && touch.user ? 'is-invalid' : ''}`} placeholder="username" 
          name="user"
          value={task.user}
          onChange={handleChange}
          onBlur={handleBlur}
         />
        {errors.user && touch.user && (<div className="invalid-feedback">{errors.user}</div>)}
      </div>

      <div className="input-group mb-1">
        <span className="input-group-text" id="basic-addon1"><i className={`fa fa-tasks fa-fw ${inputInconClassName}`} /></span>
        <select className={`form-select ${errors.mode && touch.mode ? 'is-invalid' : ''}`} name="mode" onChange={handleChange} onBlur={handleBlur} value={task.mode}>
          <option>Please select task mode...</option>
          <option value="secondary">Normal</option>
          <option value="warning">Peligrosa</option>
          <option value="danger">Chunga</option>
        </select>
        {errors.mode && touch.mode && (<div className="invalid-feedback">{errors.mode}</div>)}
      </div>

      <div className="input-group mb-1">
        <span className="input-group-text"><i className={`fa fa-tag fa-fw ${inputInconClassName}`} /></span>
        <input type="text" className={`form-control ${errors.description && touch.description ? 'is-invalid' : ''}`} placeholder="task description"
          name="description"
          value={task.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button className="btn btn-outline-primary" type="submit" disabled={!isValid()}>Create task</button>
        {errors.description && touch.description && (<div className="invalid-feedback">{errors.description}</div>)}
      </div>
    </form>
  );
}

TaskForm.defaultProps = {
  className: '',
  inputInconClassName: '',
  onTaskCreated: () => {}
}


export default TaskForm;