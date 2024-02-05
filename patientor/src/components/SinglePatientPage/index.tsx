import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from '@mui/material';
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import patients from "../../services/patients";
import diagnoseServce from "../../services/diagnoses";
import { Patient, Gender, Entry, Diagnosis, HealthCheckRating } from "../../types";
import './patient.css';
import { green, orange, red, yellow } from "@mui/material/colors";

const SinglePatientPage = () => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const { id } = useParams();
  
    useEffect(() => {
      // Validate that the id is a non-empty string
      if (typeof id !== 'string' || id.trim() === '') {
        console.error('Invalid patient ID');
        return;
      }
      
      const fetchPatient = async () => {
        const patient = await patients.getById(id);
        console.log(patient);
        setPatient(patient);
      };
      const fetchDiagnoses = async () => {
        const diagnoses = await diagnoseServce.getAll();
        setDiagnoses(diagnoses);
      };
      void fetchDiagnoses();
      void fetchPatient();
    }, [id]);

    const renderDiagnosisCodes = (entry: Entry) => {
        if (entry.diagnosisCodes && entry.diagnosisCodes.length > 0) {
          return (
            <ul>
              {entry.diagnosisCodes.map((code: string) => {
                const diagnosis = diagnoses.find(diagnose => diagnose.code === code);
                return (
                  <li key={code}>
                    {code} {diagnosis ? diagnosis.name : null}
                  </li>
                );
              })}
            </ul>
          );
        }
        return null;
      };

    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

    const renderHealthStatus = (healthCheckRating: HealthCheckRating) => {
        switch (healthCheckRating) {
            case 0:
                return (
                    <FavoriteIcon sx={{ color:green[500] }} />
                );
            case 1:
                return (
                    <FavoriteIcon sx={{ color:yellow[500] }} />
                );
            case 2:
                return (
                    <FavoriteIcon sx={{ color:orange[500] }} />
                );
            case 3:
                return (
                    <FavoriteIcon sx={{ color:red[500] }} />
                );
        }
    }

    const renderEntries = (entry: Entry) => {
        switch (entry.type) {
            case "Hospital":
                return (
                    <div key={entry.id} className="patient-entries">
                        {entry.date} <LocalHospitalIcon />
                        <br />
                        {entry.description}
                        <br />
                        {renderDiagnosisCodes(entry)}
                        <br />
                        discharged: {entry.discharge.date}. {entry.discharge.criteria}
                        <br />
                        diagnose by {entry.specialist}
                    </div>
                );
            case "HealthCheck":
                return (
                    <div key={entry.id} className="patient-entries">
                        {entry.date} <MedicalInformationIcon />
                        <br />
                        {entry.description}
                        <br />
                        {renderDiagnosisCodes(entry)}
                        <br />
                        {renderHealthStatus(entry.healthCheckRating)}
                        <br />
                        diagnose by {entry.specialist}
                    </div>
                );
            case "OccupationalHealthcare":
                return (
                    <div key={entry.id} className="patient-entries">
                        {entry.date} <WorkIcon /> {entry.employerName}
                        <br />
                        {entry.description}
                        <br />
                        {renderDiagnosisCodes(entry)}
                        <br />
                        {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
                        <br />
                        diagnose by {entry.specialist}
                    </div>
                );
            default:
                return assertNever(entry);
        }
    };
      
    
    return (
      <div>
        {patient && (
        <>
          <h2>{patient.name}
          {patient.gender === Gender.Female && <FemaleIcon />}
          {patient.gender === Gender.Male && <MaleIcon />}
          </h2>

          <p>
            ssh: {patient.ssn}<br />occupation: {patient.occupation}
          </p>
          <h3>entries</h3>
          <div>
            {patient.entries.map((entry: Entry) => (
                renderEntries(entry)
            ))}
          </div>
          <Button variant="contained" color="primary">
            add new entry
          </Button>
        </>
      )}
      </div>
    );
  };
  
  export default SinglePatientPage;