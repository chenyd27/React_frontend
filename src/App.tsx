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

// 导航栏出口
function Layout() : any{
  return (<div>
      <Navbar/>
      {/** 二级路由出口 */}
      <Outlet/>
  </div>)
}

function App() {
  return (
    <div className='App'>
        <Router>
          <Routes>
              <Route path='/' element={<Layout/>}>
                <Route index element={<Navigate to='/todolist'/>}></Route>
                <Route path='todolist'></Route>
                <Route path='bill'></Route>
                <Route path='journal'></Route>
              </Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
