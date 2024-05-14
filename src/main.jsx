import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./redux/features/store.js";

import { Route, RouterProvider, createRoutesFromElements } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom';

//private route
import PrivateRoute from "./components/PrivateRoute";
import FetchData from './pages/Auth/FetchData.jsx';
import LikedMeals from './pages/Auth/LikedMeals';
 
//Auth
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register";
import Profile from "./pages/User/Profile";

//Admin
import AdminRoute from "./pages/Admin/AdminRoute";
import UserList from "./pages/Admin/UserList";
//



const router  = createBrowserRouter(
  createRoutesFromElements(
  < Route path = '/' element ={<App />}>
    <Route path="/login" element={<Login />} />
    <Route path="/favourites" element={<LikedMeals />} />
    <Route path="/register" element={<Register />} />

    <Route path="" element={<PrivateRoute />}>
        
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<FetchData />} />


    </Route>

    <Route path="/admin" element={<AdminRoute />}> 
        <Route path="userlist" element={<UserList />} />
    </Route>

  </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  
);