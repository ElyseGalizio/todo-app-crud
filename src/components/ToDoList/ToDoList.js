import React from "react";
import { v4 as uuidv4 } from 'uuid';
import ToDo from "../ToDo/ToDo";

const defaultTodo = {
    title: '',
    date: ''
}

export default function ToDoList() {
    const [newTodo, setNewTodo] = React.useState(defaultTodo)
    const [todos, setTodos] = React.useState([
        {
            title: "wash dishes",
            completed: false,
            id: 1
        },
        {
            title: "vacuum floors",
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
    return (
        <div>
            <h1>ToDo List</h1>
            <form onSubmit={createNewTodo}>
                <input onChange={handleChange} type="text" name="title" value={newTodo.title} placeholder="type your todo" />
                <input onChange={handleChange} type="text" name="date" value={newTodo.date} placeholder="type your todo" />
                <button>Create Todo</button>
            </form>
            {todos.map(item => <ToDo {...item} deleteToDo={deleteToDo} />)}
        </div>
    )
}