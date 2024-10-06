import './App.css';
import {userState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//components
import Login from './components/account/Login';
import DataProvider from './components/contents/Dataprov';
import Home from './components/Home/Home';
import Header from './components/header-nav/Header';
const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated && token ? 
    <>
      <Header />
      <Outlet />
    </> : <Navigate replace to='/account' />
};

function App() {
  return (
   //<div sx={{mt:'64px'}} >
  //  <Login />
  // </div>
  <DataProvider>
   <BrowserRouter>
   <Header />
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path='/'element={<PrivateRoute/>}/>
    <Route path="/home" element={<Home />} />
    </Routes>
    </BrowserRouter>
    </DataProvider>
  );
}

export default App;
