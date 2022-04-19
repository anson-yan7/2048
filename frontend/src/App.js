import React, { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import axios from 'axios'

import Game from './game'

export const App = () => {
    const [isLogged, setIsLogged] = useState(false)
    const [isGame, setIsGame] = useState(false)
    const checkLogged = async () => {
      try {
        const log = await axios.get('/account/isLogged')
        setIsLogged(log)
      } catch (e) {
        console.log(e)
        alert('error check logged')
      }
    }
    checkLogged()
    const element = useRoutes([{ path: '/', element: <Gamepage isLogged={isLogged} setisLogged={setIsLogged} isGame={isGame} setIsGame={setIsGame}/> },
      { path: '/Login', element: <Login isLogged={isLogged.data} isGame={isGame} setIsGame={setIsGame} /> },
      { path: '/Signup', element: <Signup isLogged={isLogged.data} isGame={isGame} setIsGame={setIsGame} /> },
    ])
    return element
  }

function Gamepage({isLogged, setIsLogged, isGame, setIsGame}) {
  if (!isLogged) {
    window.location.replace('http://localhost:3000/Login')
  }
  const logoutUser = async () => {
  try {
    await axios.post('/account/logout')
    window.location.replace('http://localhost:3000/')
    } catch (e) {
          console.log(e)
          alert('logout error')
        }
      }
      if (!isGame) {
          Game()
      }
      setIsGame(true)
      return (<>
          <button type="button" className="btn btn-secondary" onClick={() => logoutUser()}> Logout </button>
          <p>Hellddggodddd</p>

      </>)      
}       


function Login({ isLogged, isGame, setIsGame }) {
    if (isLogged) {
      window.location.replace('http://localhost:3000/')
    }
    if (isGame) {
      setIsGame(false)
    }
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const loginUser = async () => {
      try {
        const error = await axios.post('/account/login', { username, password })
        if (error.data === 'error occured') {
          alert('login error or incorrect username')
        } else if (error.data === 'incorrect username or password') {
          alert('incorrect username or password')
        }
      } catch (e) {
        console.log(e)
        alert('login error')
      }
    }
    return (
      <>
  
        
        <div className="page-header">
          <h1>Login Here</h1>
        </div>
        Username:
        {' '}
        <input onChange={e => setUsername(e.target.value)} />
        <br />
        Password:
        {' '}
        <input onChange={e => setPassword(e.target.value)} />
        <br />
        <button type="button" className="btn btn-secondary" onClick={() => loginUser()}> Login </button>
        <button type="button" className="btn btn-secondary" onClick={() => window.location.replace('http://localhost:3000/signup/')}>Sign up!</button>
      </>
    )
  }
  
  function Signup({ isLogged, isGame, setIsGame }) {
    if (isLogged) {
      window.location.replace('http://localhost:3000/')
    }
    if (isGame) {
      setIsGame(false)
    }
    const [username, setUsername] = useState('')
    const [password1, setPassword] = useState('')
    const signupUser = async () => {
      try {
        const error = await axios.post('/account/signup', { username, password: password1 })
        if (error.data === 'username taken') {
          alert('username taken')
        } else {
          alert('signup successful')
        }
      } catch (e) {
        console.log(e)
        alert('signup error')
      }
    }
    return (
      <>
        <button type="button" className="btn btn-primary" onClick={() => window.location.replace('http://localhost:3000')}> Home </button>
        <div className="page-header">
          <h1>Signup Here</h1>
        </div>
        Username:
        {' '}
        <input onChange={e => setUsername(e.target.value)} />
        <br />
        Password:
        {' '}
        <input onChange={e => setPassword(e.target.value)} />
        <br />
        <button type="button" className="btn btn-secondary" onClick={() => signupUser()}> SignUp </button>
        <button type="button" className="btn btn-secondary" onClick={() => window.location.replace('http://localhost:3000/login/')}>Log in here!</button>
      </>
    )
  }