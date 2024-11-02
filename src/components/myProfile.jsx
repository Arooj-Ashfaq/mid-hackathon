import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const MyProfile = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const docRef = doc(db, 'doctors', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setDoctor(docSnap.data());
                } else {
                    setError('No such doctor found!');
                }
            } catch (error) {
                setError('Error fetching doctor data: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="profile">
            <h2>Doctor Profile</h2>
            <div className="profileInfo">
                <p><strong>Doctor ID:</strong> {doctor.doctorId}</p>
                <p><strong>Name:</strong> {doctor.name}</p>
                <p><strong>Specialization:</strong> {doctor.specialization}</p>
                <p><strong>Contact Info:</strong> {doctor.contactInfo}</p>

                <h3>Schedule</h3>
                {doctor.schedule.map((slot, index) => (
                    <div key={index} className="slot">
                        <p><strong>Slot ID:</strong> {slot.slotId}</p>
                        <p><strong>Start Time:</strong> {slot.startTime}</p>
                        <p><strong>End Time:</strong> {slot.endTime}</p>
                        <p><strong>Available:</strong> {slot.available ? 'Yes' : 'No'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyProfile;