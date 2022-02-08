import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addTodoToFirebase, getUsersTodos, logout, onAuthChanges } from '../firebase'
import './todos.css'

const Todos = () => {

    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState('')
    const [edit, setEdit] = useState(null)

    const navigate = useNavigate()
    useEffect(() => {
        onAuthChanges
            .then((result) => {
                console.log('userSignedIn=>', result)
                getUsersTodos().then((arrayOfTodos) => {
                    console.log('arrayOfTodos=>', arrayOfTodos)
                    setTodos(arrayOfTodos)
                })

            })
            .catch(() => {
                navigate('login')
            })


        let todos = localStorage.getItem('todos')
        todos = JSON.parse(todos)
        setTodos(todos)
    }, [])


    const handleOnChangeTodo = (e) => setTodo(e.target.value)

    const addTodo = () => {
        addTodoToFirebase(todo).then(() => {
            setTodo('')
            getUsersTodos().then((arrayOfTodos) => {
                console.log('arrayOfTodos=>', arrayOfTodos)
                setTodos(arrayOfTodos)
            })
        }).catch(() => console.log('Todo not added'))
    }

    const editTodo = (ind) => {
        const todoList = todos
        setEdit(ind)
        setTodo(todoList[ind])
    }

    const deleteTodo = (ind) => {
        const todoList = todos
        todoList.splice(ind, 1)

        setTodos([...todoList])
        localStorage.setItem('todos', JSON.stringify([...todoList]))

    }



    return (
        <div>

            <button onClick={logout}>Logout</button>
            <input placeholder='Todo' value={todo}
                onChange={handleOnChangeTodo} />

            <button onClick={addTodo}>{edit !== null ? 'Edit Todo' : 'Add Todo'}</button>
            {
                todos && todos.map((data, index) => {
                    return (
                        <div key={index} className='todo-item'>
                            <span>{data.todo}</span> <br />
                            <span>{data.uid}</span>
                            <div>
                                <button onClick={() => editTodo(index)}>Edit</button>
                                <button onClick={() => deleteTodo(index)} >Delete</button>
                            </div>
                        </div>
                    )
                })
            }


        </div>
    )
}

export default Todos