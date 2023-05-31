import axios from 'axios';
import { API } from '../config';

export default function AuthApi() {
    const login = async ({ mobile }) => {
        const result = await axios.post(`${API}/loginotp`, { mobile })
        return result;
    };

    const loginOtp = async ({ otp, _id }) => {
        const result = await axios.post(`${API}/otp`, { otp, _id });
        return result;
    };

    const fetchAllEducations = async ({ doctorId }) => {
        const result = await axios.get(`${API}/fetchEduData/${doctorId}`);
        return result;
    }
    const addDoctorInformation = async ({ doctorId }) => {
        const result = await axios.get(`${API}/fetchData/${doctorId}`);
        return result.data;
    }

    const submitDoctorInformation = async ({ doctorId, formData }) => {
        const result = await axios.post(`${API}/insertPersonalInfo/${doctorId}`, { formData })
        return result
    }
    const insertClinicData = async (newClinicData) => {
        const result = await axios.post(`${API}/insertclinic`, newClinicData)
        return result
    }
    const getAllClinicsData = async ({ doctorId }) => {
        const result = await axios.get(`${API}/fetchclinic/${doctorId}`)
        return result.data
    }
    const insertOwnClinics = async (newClinicData) => {
        const result = await axios.post(`${API}/insertownclinic`, newClinicData)
        return result
    }
    const getAllOwnClinic = async ({ doctorId }) => {
        const result = await axios.get(`${API}/fetchownclinic/${doctorId}`)
        return result.data;
    }
    const fetchDrSpecialization = async () => {
        const result = await axios.get(`${API}/drspecialization`);
        return result.data
    }
    const fetchDrDegree = async () => {
        const result = await axios.get(`${API}/drdegrees`)
        return result.data
    }
    const fetchEditEducationData = async ({ EduId }) => {
        const result = await axios.get(`${API}/fetchEditEduData/${EduId}`)
        return result.data
    }
    const getAllDrInfo = async ({ doctorId }) => {
        const result = await axios.get(`${API}/doctor/${doctorId}`);
        return result.data;

    }
    const getPatientListDetails = async ({ doctorId }) => {
        const result = await axios.get(`${API}/getBookingData/${doctorId}`);
        return result.data;
    }
    const allSessions = async (dataId) => {
        const result = await axios.post(`${API}/fetchtime`, dataId)
        return result.data;
    }
    const setSessionTimeData = async (setTimeData) => {
        const result = await axios.post(`${API}/setSession`, setTimeData)
        return result
    }
    // const setUpdateTimeData = async ({ doctorId, clinicId, _id }, setTimeData) => {
    //     const result = await axios.post(`${API}/setSession/${doctorId}/${clinicId}/${_id}`, setTimeData)
    //     return result
    // }
    const insertDrExperience = async (newDoctorData) => {
        const result = await axios.post(`${API}/insertExperience`, newDoctorData)
        return result.data
    }
    const editExperienceData = async ({ ExId }, updateExperienceData) => {
        const result = await axios.post(`${API}/updateExperience/${ExId}`, updateExperienceData)
        return result.data
    }
    const fetchExperienceData = async ({ doctorId }) => {
        const result = await axios.get(`${API}/fetchExData/${doctorId}`)
        return result.data
    }
    const getAllExperienceData = async ({ ExId }) => {
        const result = await axios.get(`${API}/fetchUpdateExperience/${ExId}`)
        return result.data
    }
    const calendarEvent = async ({ doctorId }) => {
        const result = await axios.get(`${API}/getBookingData/${doctorId}`)
        return result.data
    }
    const patientDetailsData = async ({ patientIdData }) => {
        const result = await axios.get(`${API}/patientById/${patientIdData}`)
        return result.data
    }
    const getLabData = async () => {
        const result = await axios.get(`${API}/fetch_lab_test`)
        return result.data
    }
    const symptomsData = async () => {
        const result = await axios.get(`${API}/fetchsymptoms`)
        return result.data
    }

    const getMedicine = async () => {
        const result = await axios.get(`${API}/fetchmedicines`)
        return result.data
    }
    const MedicineReportData = async (bodyData) => {
        const result = await axios.post(`${API}/medicine_report`, bodyData)
        return result.data
    };
    const insertPatientVitalSignsData = async ({ reportId }, bodyData) => {
        const result = await axios.post(`${API}/add_vital_signs/${reportId}`, bodyData)
        return result.data
    };
    const insertNewFollowUpDate = async ({ reportId }, bodyData) => {
        const result = await axios.post(`${API}/new_follw_up_date/${reportId}`, bodyData)
        return result.data
    };
    const insertInvestigationNote = async ({ reportId }, bodyData) => {
        const result = await axios.post(`${API}/add_investigation_note/${reportId}`, bodyData)
        return result.data
    };
    const insertPremedicationNote = async ({ reportId }, bodyData) => {
        const result = await axios.post(`${API}/add_premedication_note/${reportId}`, bodyData)
        return result.data
    };
    const insertSymptoms = async ({ reportId }, bodyData) => {
        const result = await axios.post(`${API}/add_symptoms/${reportId}`, bodyData)
        return result
    };
    const insertSymptom_masterTable = async (bodyData) => {
        const result = await axios.post(`${API}/addsymptoms`, bodyData)
        return result.data
    };
    const insertMedicinePrescriptionData = async (bodyData) => {
        const result = await axios.post(`${API}/add_medicinePrescription`, bodyData)
        return result.data
    };

    const insertLabPrescriptionData = async (bodyData) => {
        const result = await axios.post(`${API}/add_Labprescription`, bodyData)
        return result.data
    }
    const UpdateStatusBookingdata = async ({ appointmentId }, bodyData) => {
        const result = await axios.post(`${API}/updateStatus/${appointmentId}`, bodyData)
        return result.data
    }
    const getMedicinePrescriptionData = async ({ appointmentId }) => {
        const result = await axios.get(`${API}/fetchmedicinePrescription/${appointmentId}`)
        return result.data

    };
    const getLabTestPrescriptionData = async ({ appointmentId }) => {
        const result = await axios.get(`${API}/fetch_LabTest_Prescription/${appointmentId}`)
        return result.data
    };
    const getMedicineReport = async (appointmentId) => {
        const result = await axios.get(`${API}/fetchMedicalReport/${appointmentId}`)
        return result.data
    };
    const createPDF = async ({reportId}) => {
        console.log("-------------reportId",reportId)
        const result = await axios.post(`${API}/createprescriptionpdf/${reportId}`)
        console.log("==================", result)
        return result.data
      };
    return {
        login,
        loginOtp,
        fetchAllEducations,
        addDoctorInformation,
        submitDoctorInformation,
        insertClinicData,
        getAllClinicsData,
        insertOwnClinics,
        getAllOwnClinic,
        fetchDrSpecialization,
        fetchDrDegree,
        fetchEditEducationData,
        getAllDrInfo,
        getPatientListDetails,
        allSessions,
        setSessionTimeData,
        // setUpdateTimeData,
        insertDrExperience,
        editExperienceData,
        fetchExperienceData,
        getAllExperienceData,
        calendarEvent,
        patientDetailsData,
        getLabData,
        symptomsData,
        getMedicine,
        MedicineReportData,
        insertPatientVitalSignsData,
        insertNewFollowUpDate,
        insertInvestigationNote,
        insertPremedicationNote,
        insertSymptoms,
        insertSymptom_masterTable,
        insertMedicinePrescriptionData,
        insertLabPrescriptionData,
        UpdateStatusBookingdata,
        getMedicinePrescriptionData,
        getLabTestPrescriptionData,
        getMedicineReport,
        createPDF

    }
}