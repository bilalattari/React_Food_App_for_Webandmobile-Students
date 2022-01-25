import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './todos.css'

const Todos = () => {

    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState('')
    const [edit, setEdit] = useState(null)


    useEffect(() => {
        console.log('input call pe use effect chalge')
        let todos = localStorage.getItem('todos')
        todos = JSON.parse(todos)
        setTodos(todos)
    }, [todo])


    const handleOnChangeTodo = (e) => setTodo(e.target.value)

    const addTodo = () => {
        let todos = localStorage.getItem('todos')
        todos = JSON.parse(todos)

        if (edit !== null) {
            todos[edit] = todo
            localStorage.setItem('todos', JSON.stringify(todos))
            setEdit(null)
        }
        else {

            if (todos) {
                todos.push(todo)
            } else {
                todos = [todo]
            }
            localStorage.setItem('todos', JSON.stringify(todos))
        }
        setTodo('')

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


    console.log('edit=>', edit)



    return (
        <div>

            <input placeholder='Todo' value={todo}
                onChange={handleOnChangeTodo} />

            <button onClick={addTodo}>{edit !== null ? 'Edit Todo' : 'Add Todo'}</button>
            {
                todos.map((data, index) => {
                    return (
                        <div key={index} className='todo-item'>
                            <span>{data}</span>

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