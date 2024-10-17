import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem('token');
  console.log(isAuthenticated,token)

  // Log or handle unauthorized access
  if (!isAuthenticated || !token) {
    console.log('Unauthorized access attempt to a protected route.');
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;




// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   // Log or handle unauthorized access
//   if (!isAuthenticated) {
//     console.log('Unauthorized access attempt to a protected route.');
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default ProtectedRoute;
