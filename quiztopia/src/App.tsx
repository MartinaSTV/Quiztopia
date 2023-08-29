import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LogIn from './Views/LogIn'
import CreateQuiz from './Views/Quiz'
import CreateUser from './Views/CreateUser'
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
  ])

  return (
    <div>
      < RouterProvider  router = { router }/>
    </div>
  )
}

export default App
