
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import NavBarComponent from './components/Navbar';
// import SideBarComponent from './components/SideBarComponent';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Permissions from './components/Permission/Permissions';
import Roles from './components/Roles/Roles';
import UserTable from './components/User/User';
import Month from './components/Calendar/Month';
import { EventProvider } from './components/Calendar/EventContext';


const App = () => {

  return (
    <div className="app">
      <>
        <NavBarComponent />
        {/* <SideBarComponent /> */}
        </>
     
    <Router>
      <Routes>
      <Route path='/' element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
         <Route
          path="/permissions"
          element={
            <ProtectedRoute>
              <Permissions />
            </ProtectedRoute>
          }
        />
         <Route
          path="/roles"
          element={
            <ProtectedRoute>
              <Roles />
            </ProtectedRoute>
          }
        />
            <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserTable />
            </ProtectedRoute>
          }
        />
     
      <Route
          path="/month"
          element={
            <ProtectedRoute>
              <EventProvider>
              <Month />
              </EventProvider>
            </ProtectedRoute>
          }
        />
     </Routes>
    </Router>
    
    </div>
  );
};

export default App;