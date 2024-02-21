import axios from 'axios';
import { API } from '../config';

export default function PatientApi() {

    const loginPatient = async ({ mobile }) => {
        try {
            const result = await axios.post(`${API}/patientLogin`, { mobile })
            return result
        }
        catch (err) {
            return err;
        }
    };
    const patientLoginOtp = async ({ otp, _id }) => {
        try {
            const result = await axios.post(`${API}/patientLoginOtp`, { otp, _id })
            return result
        }
        catch (err) {
            return err;
        }
    };
    const fetchSessionSlotsData = async ({ doctorId, clinicId }) => {
        try {
            const result = await axios.get(`${API}/fetcSessionSlots/${doctorId}/${clinicId}`)
            return result.data
        }
        catch (err) {
            return err
        }
    };
    const paymentInfo = async (transactionData) => {
        try {

            const result = await axios.post(`${API}/payment/order`, transactionData)
            return result.data
        }
        catch (err) {
            return err
        }
    };
    const getbookedSlots = async (doctorId, clinicId) => {
        try {
            const result = await axios.get(`${API}/getBookingData/${doctorId}/${clinicId}`)
            return result.data
        }
        catch (err) {
            return err
        }
    };

    const patientDetailsData = async ({ patientId }) => {
        try {
            const result = await axios.get(`${API}/patientById/${patientId}`)
            return result.data
        }
        catch (err) {
            return err
        }
    }

    const signup = async ({ patientId }, bodyData) => {
        try {
            const result = await axios.post(`${API}/insertPatientDetails/${patientId}`, bodyData)
            return result.data
        }
        catch (err) {
            return err;
        }
    };
    const getPatientLifestyle = async (patientId) => {
        try {
            const result = await axios.get(`${API}/fetchPatientLifestyleInfo/${patientId}`);
            return result.data
        }
        catch (err) {
            return err
        }
    }
    const getPatientMedical = async (patientId) => {
        try {
            const result = await axios.get(`${API}/fetchPatientMedicalInfo/${patientId}`);
            return result.data
        }
        catch (err) {
            return err
        }
    }
    return {
        loginPatient,
        patientLoginOtp,
        fetchSessionSlotsData,
        paymentInfo,
        getbookedSlots,
        patientDetailsData,
        signup,
        getPatientLifestyle,
        getPatientMedical
    }


}