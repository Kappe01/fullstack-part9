import {
    Entry, 
    HospitalEntry, 
    OccupationalHealthcareEntry, 
    HealthCheckEntry, 
    HealthCheckRating, 
    Discharge, 
    Sickleave,
    Gender,
    NewPatient
} from "./types";

const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: parseEntries(object.entries),
        };

        return newPatient;
    }

    throw new Error('Incorrect data: some field are missing');
};

const parseEntries = (entries: unknown): Entry[] => {
    if (!Array.isArray(entries)) {
        throw new Error('Incorrect or missing entries');
    }

    return entries.map(entry => parseEntry(entry));
};

const parseEntry = (entry: unknown): Entry => {
    if (!entry || typeof entry !== 'object' || !('type' in entry)) {
        throw new Error('Incorrect or missing entry type');
    }

    switch (entry.type) {
        case 'Hospital':
            return parseHospitalEntry(entry);
        case 'OccupationalHealthcare':
            return parseOccupationalHealthcareEntry(entry);
        case 'HealthCheck':
            return parseHealthCheckEntry(entry);
        default:
            throw new Error('Invalid entry type');
    }
};

const parseHospitalEntry = (entry: any): HospitalEntry => {
    return {
        id: parseString(entry.id),
        description: parseString(entry.description),
        date: parseDate(entry.date),
        specialist: parseString(entry.specialist),
        diagnosisCodes: entry.diagnosisCodes,
        type: 'Hospital',
        discharge: parseDischarge(entry.discharge),
    };
};

const parseOccupationalHealthcareEntry = (entry: any): OccupationalHealthcareEntry => {
    return {
        id: parseString(entry.id),
        description: parseString(entry.description),
        date: parseDate(entry.date),
        specialist: parseString(entry.specialist),
        diagnosisCodes: entry.diagnosisCodes,
        type: 'OccupationalHealthcare',
        employerName: parseString(entry.employerName),
        sickLeave: parseSickleave(entry.sickLeave),
    };
};

const parseHealthCheckEntry = (entry: any): HealthCheckEntry => {
    return {
        id: parseString(entry.id),
        description: parseString(entry.description),
        date: parseDate(entry.date),
        specialist: parseString(entry.specialist),
        diagnosisCodes: entry.diagnosisCodes,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
    };
};

const parseDischarge = (discharge: any): Discharge => {
    if (!discharge || typeof discharge !== 'object' || !('date' in discharge) || !('criteria' in discharge)) {
        throw new Error('Incorrect or missing discharge data');
    }
    return {
        date: parseDate(discharge.date),
        criteria: parseString(discharge.criteria),
    };
};

const parseSickleave = (sickleave: any): Sickleave | undefined => {
    if (!sickleave || typeof sickleave !== 'object' || !('startDate' in sickleave) || !('endDate' in sickleave)) {
        return undefined;
    }
    return {
        startDate: parseDate(sickleave.startDate),
        endDate: parseDate(sickleave.endDate),
    };
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
    if (!isHealthCheckRating(rating)) {
        throw new Error('Incorrect or missing health check rating');
    }
    return rating;
};

const parseString = (value: any): string => {
    if (!isString(value)) {
        throw new Error('Incorrect or missing string value');
    }
    return value;
};

const parseDate = (date: any): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date value');
    }
    return date;
};

const isHealthCheckRating = (value: any): value is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(value);
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender: ' + gender);
    }
    return gender;
};

const parseName = (name: unknown):string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
};

const parseSsn = (ssn: unknown):string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }

    return ssn;
};

const parseOccupation = (occupation: unknown):string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }

    return occupation;
};

const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

export default toNewPatient;