export default function ToDo(props) {
    return (
        <div>
            <p>{props.title}</p>
            {/* we are lifting up the state */}
            <button onClick={() => props.deleteToDo(props.id)}>Delete</button>
        </div>
    )
}