import React from "react";
import { v4 as uuidv4 } from 'uuid';
import ToDo from "../ToDo/ToDo";
import './ToDoList.css';

const defaultTodo = {
    title: '',
}

export default function ToDoList() {
    const [newTodo, setNewTodo] = React.useState(defaultTodo)
    const [filterTodosValue, setFilterTodosValue] = React.useState('show-all')

    const [todos, setTodos] = React.useState([
        {
            title: "wash dishes",
            completed: false,
            id: 1
        },
        {
            title: "vacuum floors",
            completed: false,
            id: 2
        }
    ])

    const deleteToDo = (todoToBeDeletedId) => {
        const newTodos = todos.filter(item => item.id !== todoToBeDeletedId);
        setTodos(newTodos)
    }

    const handleChange = (event) => {
        setNewTodo({
            ...newTodo,
            [event.target.name]: event.target.value
        })
    }

    const createNewTodo = (event) => {
        event.preventDefault();
        const newTodos = [...todos, { ...newTodo, completed: false, id: uuidv4() }]
        setTodos(newTodos)
        setNewTodo(defaultTodo)
    }

    //edit todo by toggling the completion using a checkbox
    const editToDo = (event, todoToBeEditedId) => {
        const isTodoCompleted = event.target.checked
        const newTodos = todos.map(item => {
            if (item.id === todoToBeEditedId) {
                return { ...item, completed: isTodoCompleted }
            }
            return item
        })
        setTodos(newTodos)
    }

    function filterTodos(todos, filterQuery) {
        if (filterQuery === 'completed') {
            return todos.filter(item => item.completed !== false)
        } else if (filterQuery === 'in-progress') {
            return todos.filter(item => item.completed === false)
        } else if (filterQuery === 'show-all') {
            return todos
        }
    }
    //deploying the project to netlify
    //adding in some conditional styling

    // select has multiple options, we need to store what the user selected (state)
    // where the todos are mapped, we can add a filter prior to the map to ony show either
    // completed or in progress

    return (
        <div>
            <h1>ToDo List</h1>
            <select onChange={(event) => setFilterTodosValue(event.target.value)}>
                <option value="show-all">All Todos</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
            </select>
            <form onSubmit={createNewTodo} className="todolist-form">
                <input onChange={handleChange} type="text" name="title" value={newTodo.title} placeholder="type your todo" />
                <button className="todolist-button">Create Todo</button>
            </form>
            {filterTodos(todos, filterTodosValue).map(item => <ToDo key={item.id} {...item} deleteToDo={deleteToDo} editToDo={editToDo} />)}
        </div>
    )
}