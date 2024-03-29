import patients from '../data/patients';
import { v1 as uuid } from 'uuid';
import { NonSensitivePatientEntry, PatientEntry, NewPatient } from '../types';


const id = uuid();

const getPatients = () : PatientEntry[] => {
    return patients;
};

const getPatient = (id: string) : PatientEntry | undefined => {
    return patients.find(patient => patient.id === id)
};

const getNonSensitivePatients = () : NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( patient: NewPatient ): PatientEntry => {
    const newPatient = {
        id: id,
        ...patient,
        entries: []
    };

    patients.push(newPatient);
    return newPatient;
};

export default { getPatients, getNonSensitivePatients, addPatient, getPatient };