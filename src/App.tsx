import React from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  Outlet
} from 'react-router-dom';
import TodoList from './pages/todoList/TodoList';

// 导航栏出口
function Layout() : any{
  return (<div style={{display : 'flex'}}>
      <Navbar/>
      {/** 二级路由出口 */}
      <div style={{marginLeft : '5%',width : "75%"}}>
        <Outlet/>
      </div>
  </div>)
}

function App() {
  return (
    <div style={{display : 'flex',width : "100%"}}>
        <Router>
          <Routes>
              <Route path='/' element={<Layout/>}>
                <Route index element={<Navigate to='/todolist'/>}></Route>
                <Route path='todolist' element={<TodoList/>}></Route>
                <Route path='bill'></Route>
                <Route path='journal'></Route>
              </Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
