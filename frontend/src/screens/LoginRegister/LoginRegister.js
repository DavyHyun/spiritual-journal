import React, {useState} from 'react'
import notebook from '../../misc/images/loginNotebook.png'
import './LoginRegister.css'

const LoginRegister = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

  return (
    <div className="container">
        <div className="loginBox">
            <p className="titleText">My Spiritual Journal</p>
            <div className='entryBox'>
                <input className="formInput" type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                <input className="formInput" type="text" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="buttonsContainer">
                <div className="button">
                    <p>Login</p>
                </div>
                <div className="button">
                    <p>Register</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginRegister