import './ToDo.css';

export default function ToDo(props) {
    return (
        <div className="todo">
            <p className={props.completed ? 'strikethrough' : 'original'}>{props.title}</p>
            {props.completed ? <p>completed</p> : <p>still in progress</p>}
            <input checked={props.completed} type='checkbox' onChange={(event) => props.editToDo(event, props.id)} />
            {/* we are lifting up the state */}
            <button className='todo-delete-button' onClick={() => props.deleteToDo(props.id)}>Delete</button>
        </div>
    )
}