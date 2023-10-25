import axios from "axios";
import { API } from "../config";
import { useRecoilState } from 'recoil';
import { setSubscription } from '../recoil/atom/setSubscription';

export default function AppointmentsApi() {
    const [subscibed, setSubscribed] = useRecoilState(setSubscription)

    const getPatientListDetails = async ({ doctorId }) => {
        if (subscibed === true) {
            try {
                const result = await axios.get(`${API}/getBookingData/${doctorId}`);
                return result.data;
            }
            catch (err) {
                return err
            }
        } else {
            return null
        }
    }
    const UpdateStatusBookingdata = async ({ appointmentId }, bodyData) => {
        if (subscibed === true) {
            try {
                const result = await axios.post(`${API}/updateStatus/${appointmentId}`, bodyData)
                return result.data
            }
            catch (err) {
                return err
            }
        } else {
            return null
        }
    }
    const createPDF = async ({ reportId }) => {
        if (subscibed === true) {
            try {
                const result = await axios.post(`${API}/createprescriptionpdf/${reportId}`)
                return result.data
            }
            catch (err) {
                return err
            }
        } else {
            return null
        }
    };
    const downloadPrescription = async (reportId) => {
        if (subscibed === true) {
            try {
                const result = await axios.get(`${API}/download-prescription/${reportId}`);
                return result.data;
            }
            catch (err) {
                return err
            }
        } else {
            return null
        }
    }
    const cancelPatientAppointment = async (id) => {
        if (subscibed === true) {
            try {
                const result = await axios.delete(`${API}/cancelappointment/${id}`)
                return result
            }
            catch (err) {
                return err
            }
        } else {
            return null
        }
    }

    return {
        getPatientListDetails,
        UpdateStatusBookingdata,
        createPDF,
        downloadPrescription,
        cancelPatientAppointment
    }
}

