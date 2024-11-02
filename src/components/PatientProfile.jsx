import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const patientId = location.state?.patientId; 

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const patientDoc = await getDoc(doc(db, 'patients', patientId));
        if (patientDoc.exists()) {
          setPatient({ id: patientDoc.id, ...patientDoc.data() });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!patient) {
    return <div>No patient data found.</div>;
  }

  return (
    <div className="profile-container">
      <h2>Patient Profile</h2>
      <div className="profile-details">
        <p><strong>Patient ID:</strong> {patient.patientId}</p>
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Contact Details:</strong> {patient.contactDetails}</p>
        <p><strong>Medical History:</strong> {patient.medicalHistory}</p>
      </div>
    </div>
  );
};

export default PatientProfile;
