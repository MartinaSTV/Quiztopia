import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LogIn from './Views/LogIn'
import CreateQuiz from './Views/Quiz'
import CreateUser from './Views/CreateUser'
import LoggedOut from './Views/LoggedOut'
import './App.scss'

function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element: <CreateUser/>
    },
    {
      path:'/CreateQuiz',
      element: <CreateQuiz/>
    },
    {
      path:'/LogIn',
      element: <LogIn/>
    },
    {
      path:'/LoggedOut',
      element: <LoggedOut/>
    },
  ])

  return (
    <div className='App'>
      < RouterProvider  router = { router }/>
    </div>
  )
}

export default App
