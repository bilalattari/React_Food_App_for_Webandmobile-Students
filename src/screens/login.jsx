import react, { useEffect } from 'react'
import { loginWithGoogle, onAuthChanges } from '../firebase'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    
    const navigate = useNavigate()
    useEffect(() => {
        onAuthChanges.then(() => navigate('/'))
    }, [])


    return (
        <div>
            <h1>Login</h1>

            <button onClick={loginWithGoogle}>Login with google</button>
        </div>
    )
}

export default Login