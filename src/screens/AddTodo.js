import React, { useState } from 'react'


const AddTodos = () => {

    const [todo, setTodo] = useState('')

    const handleOnChangeTodo = (e) => setTodo(e.target.value)

    const addTodo = () => {
        let todos = localStorage.getItem('todos')
        todos = JSON.parse(todos)
        console.log('todos==>', todos)
        if (todos) {
            todos.push(todo)
        } else {
            todos = [todo]
        }
        localStorage.setItem('todos', JSON.stringify(todos))
        setTodo('')
    }
    return (
        <div>
            <input placeholder='Todo' value={todo}
                onChange={handleOnChangeTodo} />

            <button onClick={addTodo}>Add Todo</button>
        </div>
    )
}

export default AddTodos