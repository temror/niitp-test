import './App.css';
import {Route, Routes, useNavigate} from 'react-router-dom'
import Users from './pages/Users/Users';
import Todos from './pages/Todos/Todos';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Preloader from './components/Preloader';

function App() {
    const navigate = useNavigate()
    useEffect(()=>{navigate('/users')},[])
    const loading = useSelector(state=>state.main.loading)
  return (
    <div className='App'>
        {loading&&<Preloader/>}
        <Routes>
            <Route path='/users' element={<Users/>}/>
            <Route path='/todos/:id' element={<Todos/>}/>
        </Routes>
    </div>
  );
}

export default App;
