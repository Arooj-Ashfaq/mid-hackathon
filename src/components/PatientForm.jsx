import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const PatientForm = () => {
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState('');
  const [name, setName] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientData = {
      patientId,
      name,
      contactDetails,
      medicalHistory,
    };

    try {
      const docRef = await addDoc(collection(db, 'patients'), patientData);
      console.log('Patient data stored successfully:', patientData);
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', contactDetails);

      setPatientId('');
      setName('');
      setContactDetails('');
      setMedicalHistory('');

      navigate('/patient-profile', { state: { patientId: docRef.id } });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Patient Signup Form</h2>
      <form onSubmit={handleSubmit} className="patient-form">
        <div className="form-group">
          <label htmlFor="patientId">Patient ID:</label>
          <input
            type="text"
            id="patientId"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactDetails">Contact Details:</label>
          <input
            type="email"
            id="contactDetails"
            value={contactDetails}
            onChange={(e) => setContactDetails(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="medicalHistory">Medical History:</label>
          <textarea
            id="medicalHistory"
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default PatientForm;
