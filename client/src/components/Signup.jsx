// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { signup } from '../actions/authActions';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Signup = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(signup(name, email, password));
//   };

//   return (
//     <div className="d-flex align-items-center justify-content-center vh-100 bg-secondary">
//       <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
//         <h3 className="card-title text-center mb-4">Create Your Account</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group mb-3">
//             <label htmlFor="name" className="form-label">Full Name</label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               placeholder="Enter your full name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group mb-3">
//             <label htmlFor="email" className="form-label">Email address</label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group mb-3">
//             <label htmlFor="password" className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary btn-block w-100">
//             Sign Up
//           </button>
//         </form>
//         <div className="text-center mt-3">
//           <p>Already have an account? <a href="/login">Login here</a></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../actions/authActions';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signup(name, email, password)); // Await signup dispatch

      // Navigate to the login page after successful signup
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-secondary">
      <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
        <h3 className="card-title text-center mb-4">Create Your Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block w-100">
            Sign Up
          </button>
        </form>
        <div className="text-center mt-3">
          <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;


