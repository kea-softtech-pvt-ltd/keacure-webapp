import axios from 'axios';
import { API } from '../config';

export default function PatientApi() {

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
        try{
            const result = await axios.get(`${API}/getBookingData/${doctorId}/${clinicId}`)
            return result.data
        }
        catch(err){
            return err
        }
    };

    const patientDetailsData = async ({ patientId }) => {
        try{
            const result = await axios.get(`${API}/patientById/${patientId}`)
            return result.data
        }
        catch(err){
            return err
        }
    }

    return {
        fetchSessionSlotsData,
        paymentInfo,
        getbookedSlots,
        patientDetailsData
    }


}