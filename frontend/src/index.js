import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import "./index.css";
import Loginpage from "./components/User/Loginpage";
import Signup from "./components/User/Signup";
import store from './store';
import { Provider } from 'react-redux';
import Home from './components/User/Home';
import Adminlogin from "./components/admin/AdminLogin";
import AdminHomePage from './Screens/adminHome';
import AdmiAddUser from './Screens/AdminAddUser';
import EditUserScreen from './Screens/EditUserScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Loginpage />} />
      <Route index={true} path="/register" element={<Signup />} />
      <Route index={true} path="/home" element={<Home />} />
      <Route index={true} path="/adminlogin" element={<Adminlogin />} />
      <Route index={true} path="/adminhome" element={<AdminHomePage />} />
      <Route index={true} path="/adduser" element={<AdmiAddUser />} />
      <Route index={true} path="/edituser/:id" element={<EditUserScreen />} />
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

