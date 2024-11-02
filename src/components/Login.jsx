import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Assuming you'll add password handling
  const [error, setError] = useState('');
  const [name, setName] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    localStorage.setItem("userName", name );
      localStorage.setItem("userEmail", email);
    e.preventDefault();
    setError(''); // Clear previous error

    try {
      // Query the patients collection
      const patientsRef = collection(db, 'patients');
      const patientsQuery = query(patientsRef, where('contactDetails', '==', email));
      const patientsSnapshot = await getDocs(patientsQuery);

      // Query the doctors collection
      const doctorsRef = collection(db, 'doctors');
      const doctorsQuery = query(doctorsRef, where('contactInfo', '==', email));
      const doctorsSnapshot = await getDocs(doctorsQuery);

      // Check if user exists in either collection
      if (!patientsSnapshot.empty) {
        const patientData = patientsSnapshot.docs[0].data();
        console.log('Patient found:', patientData);
        navigate('/'); // Redirecting without password check for now
      } else if (!doctorsSnapshot.empty) {
        const doctorData = doctorsSnapshot.docs[0].data();
        console.log('Doctor found:', doctorData);
        navigate('/'); // Redirecting without password check for now
      } else {
        setError('No account found with that email.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred. Please check your connection or try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
      <div className="input-container">
          <label>Name</label>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
