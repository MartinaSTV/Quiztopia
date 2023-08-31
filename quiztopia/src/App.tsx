import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LogIn from './Views/LogIn'
import QuizView from './Views/QuizView'
import PlayGame from './Views/PlayGame'
import LoggedOut from './Views/LoggedOut/LoggedOut'
import './App.scss'
import CreateUser from './Views/CreateUser'

function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element: <PlayGame/>
    },
    {
      path:'/CreateQuiz',
      element: <QuizView/>
    },
    {
      path:'/LogIn',
      element: <LogIn/>
    },
    {
      path:'/LoggedOut',
      element: <LoggedOut/>
    },
    {
      path:'/CreateUser',
      element: <CreateUser/>
    },
  ])

  return (
    <div className='App'>
      < RouterProvider  router = { router }/>
    </div>
  )
}

export default App
