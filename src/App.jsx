import './App.css'
import React from 'react'
import Navbar from './components/shared/Navbar'
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { useAuth } from './store/context/AuthContextProvider';

export default function App() {

  return (
    <section className='bg-[#F6F8FC] h-screen'>
      <Router>
        <Routes>
          <Route path='/login' Component={Login} />
          <Route path='/register' Component={Register} />
          <Route element={<Protected />}>
            <Route path='/' element={<><Navbar /><Home /></>} />
          </Route>
        </Routes>
      </Router>
    </section>
  )
}


const Protected = () => {
  const { isAuthenticated } = useAuth();
  // Use Navigate to redirect to the login page if not authenticated
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};
