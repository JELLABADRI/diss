import {Link} from "react-router-dom"

import "./index.css"

const Home= () => (
    <div>
        <h1>Welcome to Todo Application</h1>
        <p>Use it, finish in it</p>
        <Link to="/register">
            <button>Register</button>
        </Link>
        <Link to="/login">
         <button>Login</button>
        </Link>
    </div>
)
export default Home
