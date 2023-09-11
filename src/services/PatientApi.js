import axios from 'axios';
import { API } from '../config';

export default function PatientApi(){

    const fetchSessionSlotsData = async ({ doctorId, clinicId }) => {
        const result = await axios.get(`${API}/fetcSessionSlots/${doctorId}/${clinicId}`)
        return result.data
    };
    const paymentInfo = async (transactionData) => {
        const result = await axios.post(`${API}/payment/order`, transactionData)
        return result.data
    };
    const getbookedSlots = async ( doctorId, clinicId ) => {
        const result = await axios.get(`${API}/getBookingData/${doctorId}/${clinicId}`)
        return result.data
    };
    return{
        fetchSessionSlotsData,
        paymentInfo,
        getbookedSlots
    }

    
}