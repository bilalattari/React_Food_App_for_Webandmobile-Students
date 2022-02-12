import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './todos.css'
import { getStorage, ref, uploadBytes, getDownloadURL } from '../firebase'
const Todos = () => {

    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState('')
    const [edit, setEdit] = useState(null)

    const navigate = useNavigate()

    const handleUploadImage = (e) => {
        console.log('function called')
        const storage = getStorage();
        const storageRef = ref(storage, 'some-child');
        console.log('Upload files===>', e.target.files[0])
        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(storageRef).then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
        });
    }




    return (
        <div>

            <input type={'file'} onChange={handleUploadImage} />

        </div>
    )
}

export default Todos