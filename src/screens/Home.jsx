import React, { useEffect, useState } from "react";
import { Link, useRoutes } from 'react-router-dom'

function Home() {
    const [color, setColor] = useState('red')

    // useEffect(() => {
    //     alert('Color Changed' + color)
    // }, [color])

    return (
        <div>
            <h1>Home</h1>
            <Link to={'about'} >Go to about page</Link>
        </div>
    )
}

export default Home