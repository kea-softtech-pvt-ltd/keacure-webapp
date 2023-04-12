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
        // console.log('result', result)
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
        // console.log("---------??????????--",result)
        return result.data
    }
    const fetchEditEducationData = async ({ EduId }) => {
        const result = await axios.get(`${API}/fetchEditEduData/${EduId}`)
        return result.data
    }
    const getAllDrInfo = async ({ doctorId }) => {
        const result = await axios.get(`${API}/doctor/${doctorId}`);
        console.log("+++++++++++", result)
        return result.data;

    }
    const getPatientListDetails = async ({ doctorId }) => {
        const result = await axios.get(`${API}/getBookingData/${doctorId}`);
        return result.data;
    }
    const allSessions = async (dataId) => {
        const result = await axios.post(`${API}/fetchtime`, dataId)
        console.log("dataId=============", dataId)
        return result.data;
    }
    const setSessionTimeData = async (setTimeData) => {
        const result = await axios.post(`${API}/setSession`, setTimeData)
        // console.log("hsffjdshfkjshfkjhskfjhskjf", result)
        return result
    }
    // const setUpdateTimeData = async ({ doctorId, clinicId, _id }, setTimeData) => {
    //     const result = await axios.post(`${API}/setSession/${doctorId}/${clinicId}/${_id}`, setTimeData)
    //     console.log("----------------", result)
    //     return result
    // }
    const insertDrExperience = async (newDoctorData) => {
        // console.log(">>>>>>>>>>>>>>>>>>>>>", newDoctorData)
        const result = await axios.post(`${API}/insertExperience`, newDoctorData)
        // console.log("==================+++++++++", result)
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
    const getAllExperienceData = async({ ExId }) => {
        const result = await axios.get(`${API}/fetchUpdateExperience/${ExId}`)
        // console.log("@@@@@@@@@@@@@@@@@@@@@@@",result)
        return result.data
    }
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
        getAllExperienceData
    }
}