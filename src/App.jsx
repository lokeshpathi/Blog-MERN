import React from 'react'
import {Route,Routes} from 'react-router-dom';
import Layout from './Layout';
import Indexpage from './Indexpage';
import Loginpage from './Loginpage';
import Registerpage from './Registerpage';
import CreateNewPost from './CreatePost';
import { UserContextProvider } from './UserContext';
import SinglePage from './SinglePage';
import EditPost from './EditPost';

function App() {

  return (
    <UserContextProvider>
    <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Indexpage/>}/>
          <Route path='login' element={<Loginpage/>} />
          <Route path='register' element={<Registerpage/>} />
          <Route path='create' element={<CreateNewPost/>} />
          <Route path='post/:id' element={<SinglePage/>} />
          <Route path='edit/:id' element={<EditPost/>} />
        </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App
