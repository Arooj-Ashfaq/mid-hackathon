import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AllPatients = () => {
  const navigate = useNavigate()
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsCollection = collection(db, 'patients');
        const patientsSnapshot = await getDocs(patientsCollection);
        const patientsList = patientsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setPatients(patientsList);
      } catch (error) {
        setError('Error fetching patients: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }
  function handleApointment(){
    navigate('/apointment')
  }
  return (
    <div className="all-patients">
      <h2 className="title">Patients</h2>
      <div className="patients-container">
        {patients.map(patient => (
          <div className="patient-card" key={patient.id}>
            <h3 className="patient-name">{patient.name}</h3>
            <p><strong>Patient ID:</strong> {patient.patientId}</p>
            <p><strong>Contact Details:</strong> {patient.contactDetails}</p>
            <p><strong>Medical History:</strong> {patient.medicalHistory}</p>
            <button onClick={handleApointment}>Ckeck me</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPatients;
